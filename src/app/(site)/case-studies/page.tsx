import type { Metadata } from 'next'
import CaseStudiesClient from './CaseStudiesClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'See how industries across mining, construction, manufacturing, and events use Traxon tracked carriers to move what nothing else can.',
  openGraph: {
    title: 'Case Studies | Traxon Industrial Carriers',
    description: 'Real projects. Proven results. See how Traxon moves the impossible across every industry.',
    images: [{ url: '/api/og?page=case-studies', width: 1200, height: 630 }],
    url: 'https://traxon.com/case-studies',
  },
  twitter: { card: 'summary_large_image', images: ['/api/og?page=case-studies'] },
  alternates: { canonical: 'https://traxon.com/case-studies' },
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />
}
