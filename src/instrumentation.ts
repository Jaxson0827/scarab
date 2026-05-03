export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config')
  }
}

// Capture server-side request errors and send to Sentry
export const onRequestError = async (
  err: unknown,
  request: Parameters<typeof import('@sentry/nextjs').captureRequestError>[1],
  context: Parameters<typeof import('@sentry/nextjs').captureRequestError>[2]
) => {
  const { captureRequestError } = await import('@sentry/nextjs')
  captureRequestError(err, request, context)
}
