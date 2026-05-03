import type { Metadata } from 'next'
import WhyTraxonClient from './WhyTraxonClient'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Why Traxon',
  description:
    '50% more payload than the nearest competitor. 40% narrower profile. Built to ISO 9001 in Houston, TX. See why engineers choose Traxon.',
  openGraph: {
    title: 'Why Traxon | Industrial Tracked Carriers',
    description: '50% more payload. 40% narrower. American-made. See the full spec comparison.',
    images: [{ url: '/api/og?page=why-traxon', width: 1200, height: 630 }],
    url: 'https://traxon.com/why-traxon',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?page=why-traxon'],
  },
  alternates: { canonical: 'https://traxon.com/why-traxon' },
}

export default function WhyTraxonPage() {
  return <WhyTraxonClient />
}
