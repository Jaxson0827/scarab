import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { withSentryConfig } from '@sentry/nextjs'

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/products/apex-6000',
        destination: '/products/scarab-x5',
        permanent: true,
      },
      {
        source: '/products/apex-1500',
        destination: '/products/scarab-x5',
        permanent: true,
      },
      {
        source: '/products/apex-3500',
        destination: '/products/scarab-x5',
        permanent: true,
      },
    ]
  },
}

const sentryOptions = {
  // Suppress the Sentry build output unless there's an error
  silent: !process.env.CI,

  // Upload source maps only when SENTRY_AUTH_TOKEN is set (i.e. in CI/Vercel)
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },

  // Disable the Sentry tunnel route to keep the build clean locally
  tunnelRoute: '/monitoring',
}

export default withSentryConfig(withAnalyzer(nextConfig), sentryOptions)
