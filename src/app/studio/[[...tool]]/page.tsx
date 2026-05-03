'use client'

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

export const dynamic_export = 'force-dynamic'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false, loading: () => <div className="min-h-screen bg-[#101112]" /> }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
