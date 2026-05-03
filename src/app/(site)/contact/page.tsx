import type { Metadata } from 'next'
import { Suspense } from 'react'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import QuoteWizardLoader from './QuoteWizardLoader'

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Request a quote or book a demo for the Traxon Scarab X5 tracked carrier. We respond within 4 business hours.',
  openGraph: {
    title: 'Get a Quote | Traxon Industrial Carriers',
    description: 'Tell us your payload and we\'ll match you to the right machine. 4-hour response guarantee.',
    images: [{ url: '/api/og?page=contact', width: 1200, height: 630 }],
    url: 'https://traxon.com/contact',
  },
  twitter: { card: 'summary_large_image', images: ['/api/og?page=contact'] },
  alternates: { canonical: 'https://traxon.com/contact' },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-black relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.12,
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="container-traxon relative z-[1]">
          <RevealOnScroll direction="left" className="mb-3">
            <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
              Get a Quote
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h1 className="font-display text-[56px] lg:text-[80px] text-white leading-none">
              Your Job.
              <br />
              Our Machine.
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main content: wizard + sidebar */}
      <section className="bg-black border-t border-border pb-24">
        <div className="container-traxon py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">

            {/* Quote Wizard */}
            <div className="bg-surface border border-border p-8 lg:p-10">
              <Suspense>
                <QuoteWizardLoader />
              </Suspense>
            </div>

            {/* Sidebar: contact info */}
            <aside className="space-y-6 lg:sticky lg:top-28">
              {/* Calendly embed placeholder */}
              <RevealOnScroll direction="left">
                <div className="bg-surface border border-border p-6">
                  <p className="font-label text-mono-label uppercase tracking-widest text-blue mb-4">
                    Book a Demo
                  </p>
                  <p className="font-body text-body-sm text-muted font-light mb-5 leading-relaxed">
                    Prefer to see the machine in action first? Schedule a 30-minute demo call with our product team.
                  </p>
                  <div
                    className="w-full bg-surface-2 border border-border flex items-center justify-center py-12"
                    aria-label="Calendly booking widget"
                  >
                    <div className="text-center">
                      <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-2">
                        Calendly Embed
                      </p>
                      <p className="font-body text-[11px] text-muted/50 font-light">
                        Configure NEXT_PUBLIC_CALENDLY_URL
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Contact details */}
              <RevealOnScroll direction="left" delay={0.08}>
                <div className="bg-surface border border-border p-6 space-y-5">
                  <p className="font-label text-mono-label uppercase tracking-widest text-white">
                    Direct Contact
                  </p>

                  {[
                    {
                      label: 'Phone',
                      value: '+1 (800) TRAXON-1',
                      href: 'tel:+18008729661',
                      icon: '📞',
                    },
                    {
                      label: 'Email',
                      value: 'sales@traxon.com',
                      href: 'mailto:sales@traxon.com',
                      icon: '✉',
                    },
                    {
                      label: 'Address',
                      value: '1200 Industrial Blvd\nHouston, TX 77015',
                      href: undefined,
                      icon: '📍',
                    },
                    {
                      label: 'Hours',
                      value: 'Mon–Fri: 7 AM – 6 PM CT\nSat: 8 AM – 12 PM CT',
                      href: undefined,
                      icon: '🕐',
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0" aria-hidden="true">
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-label text-[10px] uppercase tracking-widest text-muted mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-body text-body-sm text-mild hover:text-blue transition-colors duration-150 whitespace-pre-line"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-body text-body-sm text-mild font-light whitespace-pre-line">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>

              {/* Response time promise */}
              <RevealOnScroll direction="left" delay={0.12}>
                <div className="border border-blue/20 bg-blue-dim p-5">
                  <p className="font-display text-[20px] text-white mb-1">
                    4 Business Hours
                  </p>
                  <p className="font-body text-body-sm text-muted font-light">
                    Guaranteed response time on all quote requests. If we&apos;re slower, we&apos;ll discount your first order.
                  </p>
                </div>
              </RevealOnScroll>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
