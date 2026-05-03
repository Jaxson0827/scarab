import type { Metadata } from 'next'
import DealersClient from './DealersClient'

export const metadata: Metadata = {
  title: 'Find a Dealer',
  description:
    'Locate your nearest authorised Traxon dealer. Expert support, demo units, and rapid-response service across North America, Europe, and Australia.',
  openGraph: {
    title: 'Find a Traxon Dealer | Industrial Tracked Carriers',
    description: 'Authorised dealers across North America, Europe, and Australia. Local support, demos, and service.',
    images: [{ url: '/api/og?page=dealers', width: 1200, height: 630 }],
    url: 'https://traxon.com/dealers',
  },
  twitter: { card: 'summary_large_image', images: ['/api/og?page=dealers'] },
  alternates: { canonical: 'https://traxon.com/dealers' },
}

export default function DealersPage() {
  return <DealersClient />
}
