'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          background: '#080a0d',
          color: '#e6eaef',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#00c2ff',
              marginBottom: 12,
              fontFamily: 'monospace',
            }}
          >
            System Error
          </p>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Something went wrong.
          </h1>
          <p style={{ color: '#8a9ab0', marginBottom: 32, lineHeight: 1.6 }}>
            Our team has been notified. Please try again or contact us if the
            problem persists.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#00c2ff',
              color: '#080a0d',
              border: 'none',
              padding: '14px 32px',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
