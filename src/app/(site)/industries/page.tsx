import type { Metadata } from 'next'
import Link from 'next/link'
import { INDUSTRIES } from '@/lib/industries'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'From underground mining to live-event production — tracked carrier solutions engineered for every sector.',
  openGraph: {
    title: 'Industries We Serve | Traxon Industrial Carriers',
    description: 'From underground mining to live-event production — tracked carrier solutions for every sector.',
    images: [{ url: '/api/og?page=industries', width: 1200, height: 630 }],
    url: 'https://traxon.com/industries',
  },
  twitter: { card: 'summary_large_image', images: ['/api/og?page=industries'] },
  alternates: { canonical: 'https://traxon.com/industries' },
}

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.15,
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="container-traxon relative z-[1]">
          <RevealOnScroll direction="left" className="mb-3">
            <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
              Industries
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h1 className="font-display text-display-lg text-white leading-none">
              Every Job Site.
              <br />
              Every Sector.
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      {/* Industry grid — 2-column large cards */}
      <section className="bg-black pb-24">
        <div className="container-traxon">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {INDUSTRIES.map((industry, i) => (
              <RevealOnScroll key={industry.slug} delay={i * 0.07}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group relative flex flex-col justify-end overflow-hidden border border-border hover:border-blue/50 transition-all duration-300"
                  style={{ minHeight: '320px' }}
                >
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ background: industry.heroGradient }}
                    aria-hidden="true"
                  />
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(8,10,13,0.96) 0%, rgba(8,10,13,0.6) 50%, rgba(8,10,13,0.3) 100%)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Blue bottom border on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    aria-hidden="true"
                  />

                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="relative z-[1] p-8 lg:p-10">
                    <div
                      className="w-10 h-10 rounded-full border border-current mb-5 flex items-center justify-center opacity-60"
                      style={{ color: industry.iconColor }}
                      aria-hidden="true"
                    >
                      <span className="font-display text-[14px]">{industry.name.slice(0, 1)}</span>
                    </div>
                    <h2 className="font-display text-[36px] lg:text-[44px] text-white leading-none mb-3">
                      {industry.name.toUpperCase()}
                    </h2>
                    <p className="font-body text-body-sm text-mild font-light mb-5 max-w-[360px] leading-relaxed">
                      {industry.challengeStatement}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-label text-mono-sm uppercase tracking-widest text-blue">
                        View Solutions
                      </span>
                      <span className="text-blue transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
