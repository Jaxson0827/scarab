'use client'

import dynamic from 'next/dynamic'

const QuoteWizard = dynamic(() => import('@/components/forms/QuoteWizard'), {
  ssr: false,
  loading: () => (
    <div className="py-20 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue/30 border-t-blue rounded-full animate-spin" />
    </div>
  ),
})

export default function QuoteWizardLoader() {
  return <QuoteWizard />
}
