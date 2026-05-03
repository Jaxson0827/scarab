import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity'
import { PRODUCTS_QUERY } from '@/lib/queries'
import type { SanityProduct } from '@/types/sanity'
import { PRODUCTS } from '@/lib/products'
import type { Product } from '@/types/product'
import Badge from '@/components/ui/Badge'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'The Scarab Series',
  description:
    'Built on one philosophy: more payload, tighter spaces, and steeper grades than anything else on the market. The Traxon Scarab Series.',
  openGraph: {
    title: 'The Scarab Series | Traxon Industrial Carriers',
    description: 'More payload, tighter spaces, steeper grades. The Scarab X5.',
    images: [{ url: '/api/og?page=products', width: 1200, height: 630 }],
    url: 'https://traxon.com/products',
  },
  twitter: { card: 'summary_large_image', images: ['/api/og?page=products'] },
  alternates: { canonical: 'https://traxon.com/products' },
}

const TIER_LABELS = {
  flagship: 'FLAGSHIP',
  mid: 'MID SERIES',
  entry: 'ENTRY SERIES',
}

const TIER_BADGE_VARIANT = {
  flagship: 'blue',
  mid: 'outline',
  entry: 'muted',
} as const

function sanityToProduct(s: SanityProduct): Product {
  return {
    name: s.name,
    slug: s.slug,
    series: s.series ?? 'Scarab',
    tier: s.tier ?? 'mid',
    tagline: s.tagline ?? '',
    description: s.description ?? '',
    specs: {
      payload: s.specs?.payload ?? 0,
      width: s.specs?.width ?? 0,
      weight: s.specs?.weight ?? 0,
      battery: s.specs?.battery ?? 0,
      speed: s.specs?.speed ?? 0,
      height: s.specs?.height ?? 0,
      gradient: s.specs?.gradient ?? 0,
      hasWirelessRemote: s.specs?.hasWirelessRemote ?? false,
    },
    images: [],
    model3dUrl: s.model3dUrl,
    specSheetUrl: s.specSheetUrl,
  }
}

export default async function ProductsPage() {
  const sanityProducts = await sanityFetch<SanityProduct[]>(PRODUCTS_QUERY)
  const products: Product[] = sanityProducts?.length
    ? sanityProducts.map(sanityToProduct)
    : PRODUCTS
  return (
    <>
      {/* Page hero */}
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.2,
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          }}
        />
        <div className="container-traxon relative z-[1]">
          <RevealOnScroll direction="left" className="mb-3">
            <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
              Product Line
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08} className="mb-6">
            <h1 className="font-display text-display-lg text-white leading-none">
              The Scarab Series
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.16}>
            <p className="font-body text-body-lg text-muted font-light max-w-[540px] leading-relaxed">
              One machine. One philosophy: more payload, tighter spaces, steeper
              grades than anything else on the market.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-padding bg-black">
        <div className="container-traxon">
          <div className="flex flex-col gap-2">
            {products.map((product, i) => (
              <RevealOnScroll key={product.slug} delay={i * 0.1}>
                <Link
                  href={`/products/${product.slug}`}
                  className={[
                    'group relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12',
                    'bg-surface border p-8 lg:p-10',
                    'transition-colors duration-200 hover:bg-surface-2',
                    product.tier === 'flagship'
                      ? 'border-blue/30 hover:border-blue'
                      : 'border-border hover:border-border-2',
                  ].join(' ')}
                >
                  {/* Flagship accent line */}
                  {product.tier === 'flagship' && (
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-blue"
                      aria-hidden="true"
                    />
                  )}

                  {/* Product identity */}
                  <div className="lg:w-[280px] shrink-0">
                    <Badge
                      variant={TIER_BADGE_VARIANT[product.tier]}
                      className="mb-4"
                    >
                      {TIER_LABELS[product.tier]}
                    </Badge>
                    <h2 className="font-display text-[52px] text-white leading-none mb-1">
                      {product.name.toUpperCase()}
                    </h2>
                    <p className="font-display text-[22px] text-blue leading-none">
                      {product.specs.payload.toLocaleString()} lbs
                    </p>
                  </div>

                  {/* Tagline + description */}
                  <div className="flex-1 min-w-0 lg:border-l lg:border-border lg:pl-12">
                    <p className="font-body text-body-lg text-white font-light mb-3">
                      {product.tagline}
                    </p>
                    <p className="font-body text-body-sm text-muted font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Key specs strip */}
                  <div className="lg:w-[280px] shrink-0 grid grid-cols-2 gap-4 lg:border-l lg:border-border lg:pl-12">
                    {[
                      { label: 'Width', value: String(product.specs.width), unit: 'mm' },
                      { label: 'Gradient', value: String(product.specs.gradient), unit: '°' },
                      { label: 'Battery', value: String(product.specs.battery), unit: 'Ah' },
                      { label: 'Weight', value: String(product.specs.weight), unit: 'lbs' },
                    ].map(({ label, value, unit }) => (
                      <div key={label}>
                        <div className="flex items-baseline gap-0.5 leading-none mb-0.5">
                          <span className="font-display text-[20px] text-white">{value}</span>
                          <span className="font-display text-[13px] text-blue">{unit}</span>
                        </div>
                        <span className="font-label text-mono-sm uppercase tracking-[0.15em] text-muted">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="hidden lg:flex items-center self-stretch pl-8">
                    <span className="font-label text-mono-label text-muted group-hover:text-blue transition-all duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-surface border-t border-border">
        <div className="container-traxon text-center">
          <RevealOnScroll className="mb-4">
            <h2 className="font-display text-display-md text-white leading-none">
              Is the Scarab X5 right for your job?
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08} className="mb-8">
            <p className="font-body text-body-lg text-muted font-light max-w-[400px] mx-auto">
              Use the payload calculator or talk to our team — we&apos;ll spec
              the right machine for your job.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.16}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#payload-calculator"
                className="inline-flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 transition-all duration-200"
              >
                Payload Calculator
              </Link>
              <Link
                href="/contact?intent=quote"
                className="inline-flex items-center justify-center border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200"
              >
                Talk to Our Team
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
