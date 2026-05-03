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

// ─── HubSpot helpers ──────────────────────────────────────────────────────

async function upsertHubSpotContact(data: QuotePayload) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) return null

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.firstName,
          lastname: data.lastName,
          company: data.company,
          phone: data.phone ?? '',
          industry: data.industry,
          hs_lead_status: 'NEW',
        },
      }),
    })

    if (res.status === 409) {
      // Contact already exists — get existing ID via email
      const searchRes = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(data.email)}?idProperty=email`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!searchRes.ok) return null
      const existing = await searchRes.json()
      return existing.id as string
    }

    if (!res.ok) return null
    const contact = await res.json()
    return contact.id as string
  } catch (err) {
    Sentry.captureException(err, { tags: { area: 'hubspot-contact' } })
    return null
  }
}

async function createHubSpotDeal(
  data: QuotePayload,
  contactId: string | null,
  reference: string
) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token || !contactId) return

  try {
    const dealRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          dealname: `${data.company} — ${data.product.toUpperCase()} [${reference}]`,
          pipeline: 'default',
          dealstage: 'appointmentscheduled',
          amount: '',
          description: `Payload: ${data.payload}kg | Width: ${data.width}mm | Industry: ${data.industry}${data.accessories?.length ? ` | Accessories: ${data.accessories.join(', ')}` : ''}${data.message ? ` | Message: ${data.message}` : ''}`,
        },
      }),
    })

    if (!dealRes.ok) return
    const deal = await dealRes.json()

    // Associate deal with contact
    await fetch(
      `https://api.hubapi.com/crm/v3/objects/deals/${deal.id}/associations/contacts/${contactId}/3`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  } catch (err) {
    Sentry.captureException(err, { tags: { area: 'hubspot-deal' } })
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
  const reference = `TRX-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`
  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Chicago',
  })

  // Run HubSpot and email in parallel — errors are non-fatal
  const [contactId] = await Promise.all([
    upsertHubSpotContact(data),
  ])

  // Create deal (requires contactId)
  await createHubSpotDeal(data, contactId, reference)

  // Send emails via Resend
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
        subject: `New Quote: ${data.company} — ${data.product.toUpperCase()} [${reference}]`,
        html: internalHtml,
        replyTo: data.email,
      }),
    ])
  }

  return NextResponse.json({ success: true, reference })
}
