import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v2 as cloudinary } from 'cloudinary'
import * as Sentry from '@sentry/nextjs'

const downloadSchema = z.object({
  email: z.string().email(),
  product: z.enum(['scarab-x5']),
})

// Cloudinary public IDs for spec sheet PDFs
const SPEC_SHEET_IDS: Record<string, string> = {
  'scarab-x5': 'traxon/spec-sheets/scarab-x5',
}

async function addToHubSpotList(email: string, product: string) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) return

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
          hs_lead_status: 'OPEN',
          spec_sheet_product: product,
        },
      }),
    })
  } catch {
    // Non-critical
  }
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = downloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { email, product } = parsed.data

  // Track in HubSpot (non-blocking)
  addToHubSpotList(email, product).catch(() => undefined)

  // Generate Cloudinary signed URL if configured
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })

    try {
      const expiresAt = Math.floor(Date.now() / 1000) + 3600 // 1 hour
      const downloadUrl = cloudinary.url(SPEC_SHEET_IDS[product], {
        resource_type: 'raw',
        sign_url: true,
        expires_at: expiresAt,
        type: 'authenticated',
        flags: 'attachment',
      })
      return NextResponse.json({ success: true, downloadUrl })
    } catch (err) {
      Sentry.captureException(err, { tags: { area: 'cloudinary-signed-url' } })
      return NextResponse.json(
        { success: false, error: 'Failed to generate download link' },
        { status: 500 }
      )
    }
  }

  // Fallback: return a placeholder when Cloudinary is not configured
  return NextResponse.json({
    success: true,
    downloadUrl: null,
    message: 'Check your email — we\'ve sent the download link.',
  })
}
