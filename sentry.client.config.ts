import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Replay 10% of sessions, 100% on error
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Only send errors in production
  enabled: process.env.NODE_ENV === 'production',

  // Strip query strings containing emails / tokens from URLs before sending
  beforeSend(event) {
    if (event.request?.url) {
      try {
        const url = new URL(event.request.url)
        url.search = ''
        event.request.url = url.toString()
      } catch {
        // ignore
      }
    }
    return event
  },
})
