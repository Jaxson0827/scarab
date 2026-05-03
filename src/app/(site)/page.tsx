import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 60
import HeroSection from '@/components/home/HeroSection'
import SpecsBar from '@/components/home/SpecsBar'
import ProductLineSection from '@/components/home/ProductLineSection'
import ComparisonSection from '@/components/home/ComparisonSection'
import PayloadCalculator from '@/components/home/PayloadCalculator'
import IndustriesGrid from '@/components/home/IndustriesGrid'
import SocialProof from '@/components/home/SocialProof'
import SpecSheetCta from '@/components/home/SpecSheetCta'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Traxon — Industrial Tracked Carriers | Scarab X5 — 4,000 lbs',
  description:
    'Traxon builds the highest-payload tracked industrial carriers in the market. The Scarab X5 moves 4,000 lbs through 1-meter spaces. American-engineered.',
  openGraph: {
    title: 'Traxon — Move The Impossible. Load.',
    description:
      "The Scarab X5 carries 4,000 lbs through spaces other machines can't enter. 50% more payload than the nearest competitor.",
    images: [{ url: '/api/og?page=home', width: 1200, height: 630, alt: 'Traxon — Move The Impossible. Load.' }],
    url: 'https://traxon.com',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?page=home'],
  },
  alternates: { canonical: 'https://traxon.com' },
}

export default function HomePage() {
  return (
    <>
      {/* A — Hero */}
      <HeroSection />

      {/* C — Specs Bar */}
      <SpecsBar />

      {/* D — Product Line */}
      <ProductLineSection />

      {/* E — Why Traxon Comparison */}
      <ComparisonSection />

      {/* Payload Calculator */}
      <PayloadCalculator />

      {/* F — Industries Grid */}
      <IndustriesGrid />

      {/* G — Social Proof */}
      <SocialProof />

      {/* H — Spec Sheet CTA */}
      <SpecSheetCta />

      {/* I — Final CTA */}
      <FinalCta />
    </>
  )
}

function FinalCta() {
  return (
    <section
      id="final-cta"
      className="section-padding bg-surface relative overflow-hidden"
    >
      {/* Centered radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(0,194,255,0.06), transparent)',
        }}
      />

      <div className="container-traxon relative z-[1] text-center">
        <RevealOnScroll direction="left" className="mb-4 flex justify-center">
          <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
            Ready to Move More
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08} className="mb-6">
          <h2 className="font-display text-display-lg text-white leading-none">
            Your Job.
            <br />
            Our Machine.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.16} className="mb-10">
          <p className="font-body text-body-lg text-muted font-light max-w-[520px] mx-auto leading-relaxed">
            Tell us your load, your space, and your timeline. We&apos;ll
            configure the Scarab X5 for your project and get you a quote
            within 24 hours.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.24}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?intent=quote"
              className="inline-flex items-center justify-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 hover:-translate-y-px transition-all duration-200"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact?intent=demo"
              className="inline-flex items-center justify-center gap-2 border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200"
            >
              Book a Demo
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
