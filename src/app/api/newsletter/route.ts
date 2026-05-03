import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import * as Sentry from '@sentry/nextjs'

const newsletterSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = newsletterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { email } = parsed.data
  const token = process.env.HUBSPOT_ACCESS_TOKEN

  if (token) {
    try {
      await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            email,
            hs_email_optout: false,
            newsletter_subscriber: true,
          },
        }),
      })
    } catch (err) {
      Sentry.captureException(err, { tags: { area: 'hubspot-newsletter' } })
    }
  }

  return NextResponse.json({ success: true })
}
