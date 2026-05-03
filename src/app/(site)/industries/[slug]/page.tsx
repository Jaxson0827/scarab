import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { INDUSTRIES, getIndustryBySlug } from '@/lib/industries'
import { getCaseStudiesByIndustry } from '@/lib/caseStudies'
import { PRODUCTS } from '@/lib/products'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

export const revalidate = 60

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) return {}
  return {
    title: industry.name,
    description: industry.challengeStatement,
    openGraph: {
      title: `${industry.name} | Traxon Industrial Carriers`,
      description: industry.challengeStatement,
      images: [{ url: `/api/og?page=industry&slug=${slug}`, width: 1200, height: 630 }],
      url: `https://traxon.com/industries/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og?page=industry&slug=${slug}`],
    },
    alternates: { canonical: `https://traxon.com/industries/${slug}` },
  }
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) notFound()

  const relatedCaseStudies = getCaseStudiesByIndustry(slug)
  const recommendedProduct = PRODUCTS.find((p) => p.slug === industry.recommendedProduct)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://traxon.com' },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://traxon.com/industries' },
      { '@type': 'ListItem', position: 3, name: industry.name, item: `https://traxon.com/industries/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero */}
      <section
        className="pt-32 pb-24 relative overflow-hidden"
        style={{ background: industry.heroGradient }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'linear-gradient(to bottom, rgba(8,10,13,0.4), rgba(8,10,13,0.85))' }}
        />
        <div className="container-traxon relative z-[1]">
          <RevealOnScroll direction="left" className="mb-3">
            <Link
              href="/industries"
              className="font-label text-mono-sm uppercase tracking-widest text-muted hover:text-blue transition-colors duration-150"
            >
              ← All Industries
            </Link>
          </RevealOnScroll>
          <RevealOnScroll delay={0.06} className="mb-4">
            <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
              {industry.name}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <h1 className="font-display text-[56px] lg:text-[80px] text-white leading-none max-w-[700px]">
              {industry.challengeStatement}
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      <div className="bg-black">
        <div className="container-traxon py-20 space-y-24">

          {/* The Challenge */}
          <section>
            <RevealOnScroll className="mb-8">
              <h2 className="font-display text-[36px] lg:text-[48px] text-white leading-none">
                The Challenge
              </h2>
            </RevealOnScroll>
            <ul className="space-y-3">
              {industry.challenges.map((challenge, i) => (
                <RevealOnScroll key={i} delay={i * 0.06} direction="left">
                  <li className="flex items-start gap-4 bg-surface border border-border p-5">
                    <span className="text-blue mt-0.5 shrink-0">→</span>
                    <span className="font-body text-body-sm text-mild font-light leading-relaxed">
                      {challenge}
                    </span>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </section>

          {/* The Traxon Solution */}
          <section>
            <RevealOnScroll className="mb-8">
              <h2 className="font-display text-[36px] lg:text-[48px] text-white leading-none">
                The Traxon Solution
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {industry.traxonSolutions.map((item, i) => (
                <RevealOnScroll key={i} delay={i * 0.06}>
                  <div className="bg-surface border border-border p-6 hover:border-blue/30 transition-colors duration-200">
                    <p className="font-label text-mono-sm uppercase tracking-widest text-blue mb-3">
                      Challenge: {item.pain}
                    </p>
                    <p className="font-body text-body-sm text-mild font-light leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* Recommended Product */}
          {recommendedProduct && (
            <section>
              <RevealOnScroll className="mb-6">
                <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
                  Recommended
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <Link
                  href={`/products/${recommendedProduct.slug}`}
                  className="group flex flex-col lg:flex-row items-start lg:items-center gap-8 bg-surface border border-blue/30 hover:border-blue p-8 lg:p-10 transition-colors duration-200 relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{ background: 'radial-gradient(ellipse 40% 80% at 0% 50%, rgba(0,194,255,0.04), transparent)' }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue" aria-hidden="true" />
                  <div className="relative z-[1]">
                    <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-1">
                      Recommended for {industry.name}
                    </p>
                    <h3 className="font-display text-[48px] lg:text-[64px] text-white leading-none mb-1">
                      {recommendedProduct.name.toUpperCase()}
                    </h3>
                    <p className="font-display text-[24px] text-blue">
                      {recommendedProduct.specs.payload.toLocaleString()} kg payload
                    </p>
                  </div>
                  <div className="relative z-[1] lg:ml-auto flex items-center gap-2">
                    <span className="font-label text-mono-sm uppercase tracking-widest text-blue">View Specs</span>
                    <span className="text-blue group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </Link>
              </RevealOnScroll>
            </section>
          )}

          {/* Key stat */}
          <RevealOnScroll>
            <div className="border border-border bg-surface p-8 text-center">
              <p className="font-display text-[64px] lg:text-[80px] text-blue leading-none mb-2">
                {industry.keyStat.value}
              </p>
              <p className="font-label text-mono-label uppercase tracking-widest text-muted">
                {industry.keyStat.label}
              </p>
            </div>
          </RevealOnScroll>

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <section>
              <RevealOnScroll className="mb-8">
                <h2 className="font-display text-[36px] lg:text-[48px] text-white leading-none">
                  Case Studies
                </h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {relatedCaseStudies.slice(0, 2).map((cs, i) => (
                  <RevealOnScroll key={cs.slug} delay={i * 0.08}>
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="group flex flex-col bg-surface border border-border hover:border-blue/40 p-6 transition-colors duration-200"
                    >
                      <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-3">
                        {cs.country}
                      </p>
                      <h3 className="font-body text-body-lg text-white font-light mb-3 leading-snug group-hover:text-blue transition-colors duration-150">
                        {cs.headline}
                      </h3>
                      <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border">
                        {cs.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <p className="font-display text-[22px] text-blue">{m.value}</p>
                            <p className="font-label text-[10px] uppercase tracking-widest text-muted">{m.label}</p>
                          </div>
                        ))}
                        <span className="ml-auto font-label text-mono-sm text-muted group-hover:text-blue transition-colors duration-150">Read →</span>
                      </div>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          )}

          {/* Quote CTA */}
          <section className="bg-surface border border-border p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div>
                <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue mb-3">
                  Get Started
                </p>
                <h2 className="font-display text-[36px] lg:text-[48px] text-white leading-none">
                  Have a {industry.name.split(' ')[0]} job?
                  <br />
                  Let&apos;s talk.
                </h2>
              </div>
              <div className="lg:ml-auto flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href={`/contact?intent=quote&industry=${industry.slug}`}
                  className="inline-flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 transition-all duration-200"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact?intent=demo"
                  className="inline-flex items-center justify-center border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
