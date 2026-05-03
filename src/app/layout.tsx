import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['200', '300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://traxon.com'),
  title: {
    default: 'Traxon — Industrial Tracked Carriers | Scarab X5 — 4,000 lbs',
    template: '%s | Traxon',
  },
  description:
    'Traxon builds the highest-payload tracked industrial carriers in the market. The Scarab X5 moves 4,000 lbs through 1-meter spaces. American-engineered.',
  keywords: [
    'industrial tracked carrier',
    'heavy load mover',
    'tracked load carrier',
    'Scarab X5',
    'industrial material handling',
    'compact tracked vehicle',
    'plant relocation equipment',
  ],
  authors: [{ name: 'Traxon Industrial Carriers', url: 'https://traxon.com' }],
  creator: 'Traxon Industrial Carriers',
  publisher: 'Traxon Industrial Carriers',
  openGraph: {
    siteName: 'Traxon Industrial Carriers',
    title: 'Traxon — Move The Impossible. Load.',
    description:
      "The Scarab X5 carries 4,000 lbs through spaces other machines can't enter. 50% more payload than the nearest competitor.",
    images: [
      {
        url: '/api/og?page=home',
        width: 1200,
        height: 630,
        alt: 'Traxon — Move The Impossible. Load. Scarab X5: 4,000 lbs through 1 metre.',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traxon — Industrial Tracked Carriers',
    description: 'The Scarab X5 moves 4,000 lbs through 1-meter spaces. American-engineered.',
    images: ['/api/og?page=home'],
  },
  alternates: { canonical: 'https://traxon.com' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFY ?? '',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// Organization JSON-LD — site-wide
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Traxon Industrial Carriers',
  url: 'https://traxon.com',
  logo: 'https://traxon.com/logo.png',
  description:
    'American-engineered industrial tracked carriers. The Scarab series moves heavy loads through spaces other machines cannot enter.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-800-TRAXON-1',
    contactType: 'sales',
    areaServed: ['US', 'CA', 'AU', 'GB', 'DE'],
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1200 Industrial Blvd',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77015',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.linkedin.com/company/traxon-industrial',
    'https://www.youtube.com/@traxonindustrial',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        {/* Preconnect to critical external origins */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href="https://client.crisp.chat" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-black text-text antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
