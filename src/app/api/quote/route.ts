import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { Resend } from 'resend'
import { render } from '@react-email/components'
import * as Sentry from '@sentry/nextjs'
import { QuoteConfirmationEmail } from '@/emails/QuoteConfirmation'
import { QuoteInternalEmail } from '@/emails/QuoteInternal'

// ─── Validation schema ────────────────────────────────────────────────────

const quoteSchema = z.object({
  industry: z.enum(['construction', 'mining', 'utilities', 'events', 'other']),
  payload: z.number().min(0).max(10000),
  width: z.number().min(0).max(5000),
  gradient: z.number().min(0).max(90),
  product: z.enum(['scarab-x5']),
  accessories: z.array(z.string()).optional().default([]),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  company: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().max(1000).optional(),
})

type QuotePayload = z.infer<typeof quoteSchema>

const HUBSPOT_HEADERS = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
})

const INDUSTRY_LABELS: Record<QuotePayload['industry'], string> = {
  construction: 'Construction',
  mining: 'Mining',
  utilities: 'Utilities',
  events: 'Events',
  other: 'Other',
}

function formatProductLabel(product: string) {
  return product
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function contactProperties(data: QuotePayload) {
  const properties: Record<string, string> = {
    email: data.email,
    firstname: data.firstName,
    lastname: data.lastName,
    company: data.company,
  }
  if (data.phone) properties.phone = data.phone
  return properties
}

async function hubspotFetch(
  token: string,
  url: string,
  init: RequestInit
): Promise<Response> {
  return fetch(url, {
    ...init,
    headers: {
      ...HUBSPOT_HEADERS(token),
      ...(init.headers ?? {}),
    },
  })
}

async function getDefaultPipelineStage(
  token: string
): Promise<{ pipeline: string; stage: string }> {
  const fallback = { pipeline: 'default', stage: 'appointmentscheduled' }

  try {
    const res = await hubspotFetch(token, 'https://api.hubapi.com/crm/v3/pipelines/deals', {
      method: 'GET',
    })
    if (!res.ok) return fallback

    const data = (await res.json()) as {
      results?: Array<{
        id: string
        stages?: Array<{ id: string; displayOrder: number }>
      }>
    }

    const pipeline =
      data.results?.find((p) => p.id === 'default') ?? data.results?.[0]
    const stage = pipeline?.stages
      ?.slice()
      .sort((a, b) => a.displayOrder - b.displayOrder)[0]

    if (!pipeline?.id || !stage?.id) return fallback
    return { pipeline: pipeline.id, stage: stage.id }
  } catch {
    return fallback
  }
}

async function upsertHubSpotContact(
  token: string,
  data: QuotePayload
): Promise<string | null> {
  const properties = contactProperties(data)

  const createRes = await hubspotFetch(token, 'https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    body: JSON.stringify({ properties }),
  })

  if (createRes.ok) {
    const contact = (await createRes.json()) as { id: string }
    return contact.id
  }

  if (createRes.status === 409) {
    const updateRes = await hubspotFetch(
      token,
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(data.email)}?idProperty=email`,
      {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      }
    )

    if (updateRes.ok) {
      const contact = (await updateRes.json()) as { id: string }
      return contact.id
    }

    const errBody = await updateRes.text().catch(() => '')
    console.error('[HubSpot] contact update failed:', updateRes.status, errBody)
    Sentry.captureMessage('HubSpot contact update failed', {
      level: 'error',
      tags: { area: 'hubspot-contact' },
      extra: { status: updateRes.status, body: errBody },
    })
    return null
  }

  const errBody = await createRes.text().catch(() => '')
  console.error('[HubSpot] contact create failed:', createRes.status, errBody)
  Sentry.captureMessage('HubSpot contact create failed', {
    level: 'error',
    tags: { area: 'hubspot-contact' },
    extra: { status: createRes.status, body: errBody },
  })
  return null
}

function buildDealDescription(data: QuotePayload, reference: string) {
  const industryLabel = INDUSTRY_LABELS[data.industry]
  const productLabel = formatProductLabel(data.product)
  const accessoryNote = data.accessories?.length
    ? ` | Accessories: ${data.accessories.join(', ')}`
    : ''
  const specsNote = `Width: ${data.width}mm | Gradient: ${data.gradient}°${accessoryNote}`

  return [
    `Reference: ${reference}`,
    `Industry: ${industryLabel}`,
    `Payload: ${data.payload} kg`,
    productLabel,
    specsNote,
    data.message ? `Message: ${data.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function buildDealProperties(
  data: QuotePayload,
  reference: string,
  pipeline: string,
  stage: string,
  includeCustom = true
) {
  const industryLabel = INDUSTRY_LABELS[data.industry]
  const productLabel = formatProductLabel(data.product)

  const properties: Record<string, string> = {
    dealname: `${data.company} — Scarab X5 Quote Request`,
    pipeline,
    dealstage: stage,
    description: buildDealDescription(data, reference),
  }

  if (includeCustom) {
    properties.quote_industry = industryLabel
    properties.payload_requirement = `${data.payload} kg`
    properties.product_interested_in = productLabel
    properties.quote_notes = data.message ?? ''
  }

  return properties
}

async function createHubSpotDeal(
  token: string,
  data: QuotePayload,
  contactId: string,
  reference: string
): Promise<void> {
  const { pipeline, stage } = await getDefaultPipelineStage(token)
  let dealRes = await hubspotFetch(token, 'https://api.hubapi.com/crm/v3/objects/deals', {
    method: 'POST',
    body: JSON.stringify({
      properties: buildDealProperties(data, reference, pipeline, stage, true),
    }),
  })

  if (!dealRes.ok) {
    dealRes = await hubspotFetch(token, 'https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify({
        properties: buildDealProperties(data, reference, pipeline, stage, false),
      }),
    })
  }

  if (!dealRes.ok) {
    const errBody = await dealRes.text().catch(() => '')
    console.error('[HubSpot] deal create failed:', dealRes.status, errBody)
    Sentry.captureMessage('HubSpot deal create failed', {
      level: 'error',
      tags: { area: 'hubspot-deal' },
      extra: { status: dealRes.status, body: errBody },
    })
    return
  }

  const deal = (await dealRes.json()) as { id: string }

  const assocBody = JSON.stringify({
    inputs: [
      {
        from: { id: deal.id },
        to: { id: contactId },
        type: 'deal_to_contact',
      },
    ],
  })
  const assocUrl =
    'https://api.hubapi.com/crm/v3/associations/deals/contacts/batch/create'

  let assocRes = await hubspotFetch(token, assocUrl, { method: 'PUT', body: assocBody })
  if (!assocRes.ok) {
    assocRes = await hubspotFetch(token, assocUrl, { method: 'POST', body: assocBody })
  }

  if (!assocRes.ok) {
    const errBody = await assocRes.text().catch(() => '')
    console.error('[HubSpot] deal-contact association failed:', assocRes.status, errBody)
    Sentry.captureMessage('HubSpot deal association failed', {
      level: 'error',
      tags: { area: 'hubspot-association' },
      extra: { status: assocRes.status, body: errBody },
    })
  }
}

async function submitToHubSpot(data: QuotePayload, reference: string): Promise<void> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  const portalId = process.env.HUBSPOT_PORTAL_ID

  if (!token) {
    console.error('[HubSpot] HUBSPOT_ACCESS_TOKEN is not configured')
    return
  }

  if (!portalId) {
    console.error('[HubSpot] HUBSPOT_PORTAL_ID is not configured')
  }

  try {
    const contactId = await upsertHubSpotContact(token, data)
    if (!contactId) return
    await createHubSpotDeal(token, data, contactId, reference)
  } catch (err) {
    console.error('[HubSpot] submission error:', err)
    Sentry.captureException(err, { tags: { area: 'hubspot-quote' } })
  }
}

// ─── Route handler ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = quoteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data
  const reference = randomUUID()
  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Chicago',
  })

  await submitToHubSpot(data, reference)

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const resend = new Resend(resendKey)
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@traxon.com'
    const salesEmail = process.env.RESEND_SALES_EMAIL ?? 'sales@traxon.com'

    const [confirmationHtml, internalHtml] = await Promise.all([
      render(
        QuoteConfirmationEmail({
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          product: data.product,
          accessories: data.accessories,
          reference,
          industry: data.industry,
          payload: data.payload,
          width: data.width,
        })
      ),
      render(
        QuoteInternalEmail({
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          email: data.email,
          phone: data.phone,
          message: data.message,
          product: data.product,
          accessories: data.accessories,
          industry: data.industry,
          payload: data.payload,
          width: data.width,
          gradient: data.gradient,
          reference,
          submittedAt,
        })
      ),
    ])

    await Promise.allSettled([
      resend.emails.send({
        from: `Traxon <${fromEmail}>`,
        to: data.email,
        subject: `Your Traxon Quote Request — ${reference}`,
        html: confirmationHtml,
      }),
      resend.emails.send({
        from: `Traxon Leads <${fromEmail}>`,
        to: salesEmail,
        subject: `New Quote: ${data.company} — Scarab X5 [${reference}]`,
        html: internalHtml,
        replyTo: data.email,
      }),
    ])
  }

  return NextResponse.json({ success: true, reference })
}
