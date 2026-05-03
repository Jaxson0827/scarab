import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CASE_STUDIES, getCaseStudyBySlug } from '@/lib/caseStudies'
import { PRODUCTS } from '@/lib/products'
import CountUp from '@/components/animations/CountUp'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

export const revalidate = 60

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.headline,
    openGraph: {
      title: `${cs.title} | Traxon Case Studies`,
      description: cs.headline,
      images: [{ url: `/api/og?page=case-study&slug=${slug}`, width: 1200, height: 630 }],
      url: `https://traxon.com/case-studies/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og?page=case-study&slug=${slug}`],
    },
    alternates: { canonical: `https://traxon.com/case-studies/${slug}` },
  }
}

const INDUSTRY_LABELS: Record<string, string> = {
  construction: 'Construction & Civil',
  mining: 'Mining & Quarrying',
  manufacturing: 'Manufacturing',
  utilities: 'Utilities & Energy',
  events: 'Events & Production',
  shipbuilding: 'Shipbuilding & Marine',
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const product = PRODUCTS.find((p) => p.slug === cs.productSlug)
  const related = CASE_STUDIES.filter(
    (c) => c.slug !== cs.slug && (c.industry === cs.industry || c.productSlug === cs.productSlug)
  ).slice(0, 2)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.headline,
    author: { '@type': 'Organization', name: 'Traxon Industrial Carriers' },
    publisher: { '@type': 'Organization', name: 'Traxon Industrial Carriers', logo: 'https://traxon.com/logo.png' },
    datePublished: cs.publishedAt,
    url: `https://traxon.com/case-studies/${slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://traxon.com' },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://traxon.com/case-studies' },
      { '@type': 'ListItem', position: 3, name: cs.title, item: `https://traxon.com/case-studies/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-0 bg-black relative overflow-hidden">
        <div className="container-traxon relative z-[1] pb-12 border-b border-border">
          <RevealOnScroll direction="left" className="mb-4 flex items-center gap-3">
            <Link
              href="/case-studies"
              className="font-label text-mono-sm uppercase tracking-widest text-muted hover:text-blue transition-colors duration-150"
            >
              ← Case Studies
            </Link>
            <span className="text-border-2">·</span>
            <span className="font-label text-mono-sm uppercase tracking-widest bg-blue text-black px-2 py-0.5">
              {INDUSTRY_LABELS[cs.industry]}
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.06} className="mb-4">
            <p className="font-label text-mono-label uppercase tracking-[0.15em] text-muted">
              {cs.client} · {cs.country}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.12} className="mb-8">
            <h1 className="font-display text-[48px] lg:text-[72px] text-white leading-[0.95] max-w-[800px]">
              {cs.headline}
            </h1>
          </RevealOnScroll>

          {/* Outcome metrics */}
          <RevealOnScroll delay={0.18}>
            <div className="flex flex-wrap gap-8">
              {cs.metrics.map((m) => (
                <div key={m.label}>
                  <CountUp
                    target={parseFloat(m.value.replace(/[^0-9.]/g, '')) || 0}
                    suffix={m.value.replace(/[0-9.,\s]/g, '')}
                    className="font-display text-[44px] lg:text-[56px] text-blue leading-none"
                  />
                  <p className="font-label text-mono-sm uppercase tracking-widest text-muted mt-1">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Hero image placeholder */}
      <div
        className="w-full aspect-[21/9] bg-surface-2 border-b border-border relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-surface-3) 100%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[80px] lg:text-[120px] text-white/5 select-none">
            {cs.client.split(' ').map((w) => w[0]).join('')}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-black">
        <div className="container-traxon py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">

            {/* Left: editorial content */}
            <div className="space-y-16">

              {/* The Challenge */}
              <section>
                <RevealOnScroll className="mb-6">
                  <h2 className="font-display text-[32px] lg:text-[40px] text-white leading-none">
                    The Challenge
                  </h2>
                </RevealOnScroll>
                <RevealOnScroll delay={0.06}>
                  <p className="font-body text-body-lg text-mild font-light leading-relaxed">
                    {cs.challenge}
                  </p>
                </RevealOnScroll>
              </section>

              {/* The Solution */}
              <section>
                <RevealOnScroll className="mb-6">
                  <h2 className="font-display text-[32px] lg:text-[40px] text-white leading-none">
                    The Solution
                  </h2>
                </RevealOnScroll>
                <RevealOnScroll delay={0.06}>
                  <p className="font-body text-body-lg text-mild font-light leading-relaxed">
                    {cs.solution}
                  </p>
                </RevealOnScroll>
              </section>

              {/* The Outcome */}
              <section>
                <RevealOnScroll className="mb-6">
                  <h2 className="font-display text-[32px] lg:text-[40px] text-white leading-none">
                    The Outcome
                  </h2>
                </RevealOnScroll>
                <RevealOnScroll delay={0.06}>
                  <p className="font-body text-body-lg text-mild font-light leading-relaxed">
                    {cs.outcome}
                  </p>
                </RevealOnScroll>
              </section>

              {/* Pull quote */}
              <RevealOnScroll>
                <blockquote className="border-l-4 border-blue pl-8 py-2">
                  <p className="font-display text-[24px] lg:text-[28px] text-white leading-snug mb-5">
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </p>
                  <footer>
                    <p className="font-body text-body-sm text-mild font-medium">
                      {cs.testimonial.name}
                    </p>
                    <p className="font-body text-body-sm text-muted font-light">
                      {cs.testimonial.title}, {cs.testimonial.company}
                    </p>
                  </footer>
                </blockquote>
              </RevealOnScroll>
            </div>

            {/* Right: product sidebar */}
            <aside className="space-y-6">
              {product && (
                <RevealOnScroll direction="left">
                  <div className="bg-surface border border-border p-6 sticky top-28">
                    <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-4">
                      Machine Used
                    </p>
                    <p className="font-display text-[36px] text-white leading-none mb-1">
                      {product.name.toUpperCase()}
                    </p>
                    <p className="font-display text-[20px] text-blue mb-4">
                      {product.specs.payload.toLocaleString()} kg
                    </p>
                    <div className="space-y-2 mb-6 border-t border-border pt-4">
                      {[
                        { label: 'Width', value: `${product.specs.width}mm` },
                        { label: 'Gradient', value: `${product.specs.gradient}°` },
                        { label: 'Battery', value: `${product.specs.battery}Ah` },
                      ].map((s) => (
                        <div key={s.label} className="flex justify-between">
                          <span className="font-label text-mono-sm uppercase tracking-widest text-muted">{s.label}</span>
                          <span className="font-body text-body-sm text-mild">{s.value}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest py-3 rounded-[3px] hover:opacity-85 transition-all duration-200"
                    >
                      View Full Specs →
                    </Link>
                  </div>
                </RevealOnScroll>
              )}
            </aside>
          </div>
        </div>

        {/* Related case studies */}
        {related.length > 0 && (
          <div className="border-t border-border">
            <div className="container-traxon py-16">
              <RevealOnScroll className="mb-8">
                <h2 className="font-display text-[32px] text-white leading-none">
                  Related Projects
                </h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {related.map((r, i) => (
                  <RevealOnScroll key={r.slug} delay={i * 0.08}>
                    <Link
                      href={`/case-studies/${r.slug}`}
                      className="group flex flex-col bg-surface border border-border hover:border-blue/40 p-6 transition-colors duration-200"
                    >
                      <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-2">
                        {INDUSTRY_LABELS[r.industry]} · {r.country}
                      </p>
                      <h3 className="font-body text-body-lg text-white font-light leading-snug mb-4 group-hover:text-blue transition-colors duration-150">
                        {r.headline}
                      </h3>
                      <div className="mt-auto flex gap-6 pt-4 border-t border-border">
                        {r.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <p className="font-display text-[22px] text-blue">{m.value}</p>
                            <p className="font-label text-[10px] uppercase tracking-widest text-muted">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="border-t border-border">
          <div className="container-traxon py-16 text-center">
            <RevealOnScroll className="mb-6">
              <h2 className="font-display text-[40px] lg:text-[56px] text-white leading-none">
                Have a similar challenge?
                <br />
                <span className="text-blue">Let&apos;s talk.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <Link
                href="/contact?intent=quote"
                className="inline-flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest px-10 py-4 rounded-[3px] hover:opacity-85 transition-all duration-200"
              >
                Request a Quote
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </>
  )
}
