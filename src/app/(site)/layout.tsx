import { GoogleAnalytics } from '@next/third-parties/google'
import SmoothScrollProvider from '@/providers/SmoothScrollProvider'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import FloatingCta from '@/components/layout/FloatingCta'
import CrispChat from '@/components/analytics/CrispChat'
import ExitIntentModal from '@/components/ui/ExitIntentModal'
import HotjarScript from '@/components/analytics/HotjarScript'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingCta />
      <ExitIntentModal />
      <CrispChat />
      <HotjarScript />
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </SmoothScrollProvider>
  )
}
