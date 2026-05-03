import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = '2025-01-01'

// Lazily initialized — only created when projectId is available
let _client: ReturnType<typeof createClient> | null = null

function getClient() {
  if (!projectId) return null
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      stega: { enabled: false, studioUrl: '/studio' },
    })
  }
  return _client
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  const c = getClient()
  if (!c) throw new Error('Sanity client not configured')
  return imageUrlBuilder(c).image(source)
}

/**
 * Fetches data from Sanity with ISR revalidation.
 * Returns null gracefully when NEXT_PUBLIC_SANITY_PROJECT_ID is not set.
 */
export async function sanityFetch<QueryResponse>(
  query: string,
  params?: Record<string, unknown>
): Promise<QueryResponse | null> {
  const c = getClient()
  if (!c) return null
  try {
    return await c.fetch<QueryResponse>(query, params ?? {}, {
      next: { revalidate: 60 },
    })
  } catch (err) {
    // Capture to Sentry in production; swallow silently so the page can fall
    // back to static data rather than throwing a 500.
    if (process.env.NODE_ENV === 'production') {
      const Sentry = await import('@sentry/nextjs')
      Sentry.captureException(err, { tags: { area: 'sanity-fetch' } })
    }
    return null
  }
}
