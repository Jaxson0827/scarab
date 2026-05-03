import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS_QUERY } from '@/lib/queries'
import type { SanityProduct } from '@/types/sanity'
import { PRODUCTS, getProductBySlug, getAccessoriesForProduct } from '@/lib/products'
import type { Product, Accessory } from '@/types/product'
import StickyRail from '@/components/product/StickyRail'
import SpecTable from '@/components/product/SpecTable'
import CompareStrip from '@/components/product/CompareStrip'
import ProductDetailClient from './ProductDetailClient'
import AccessoriesGrid from './AccessoriesGrid'

export const revalidate = 60

// ─── Static params (pre-render all product pages) ─────────────────────────

export async function generateStaticParams() {
  const sanityProducts = await sanityFetch<Array<{ slug: string }>>(
    PRODUCT_SLUGS_QUERY
  )
  if (sanityProducts?.length) {
    return sanityProducts.map(({ slug }) => ({ slug }))
  }
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const sanity = await sanityFetch<SanityProduct>(PRODUCT_BY_SLUG_QUERY, { slug })
  const name = sanity?.name ?? getProductBySlug(slug)?.name ?? 'Product'
  const payload = sanity?.specs?.payload ?? getProductBySlug(slug)?.specs.payload
  const description =
    sanity?.description ??
    getProductBySlug(slug)?.description ??
    `Traxon ${name} — industrial tracked carrier.`

  return {
    title: `${name}${payload ? ` — ${payload.toLocaleString()} lbs` : ''}`,
    description,
    openGraph: {
      title: `Traxon ${name}${payload ? ` — ${payload.toLocaleString()} lbs` : ''}`,
      description,
      images: [{ url: `/api/og?page=product&slug=${slug}`, width: 1200, height: 630 }],
      url: `https://traxon.com/products/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Traxon ${name}`,
      description,
      images: [`/api/og?page=product&slug=${slug}`],
    },
    alternates: { canonical: `https://traxon.com/products/${slug}` },
  }
}

// ─── Transform Sanity → local Product type ────────────────────────────────

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
    competitorComparison: s.competitors?.[0]
      ? {
          name: s.competitors[0].name,
          payload: s.competitors[0].payload ?? 0,
          width: s.competitors[0].width ?? 0,
          battery: 0,
          gradient: s.competitors[0].gradient ?? 0,
          hasRotation: false,
        }
      : undefined,
  }
}

function sanityToAccessories(s: SanityProduct): Accessory[] {
  return (s.accessories ?? []).map((a) => ({
    id: a.slug,
    name: a.name,
    shortDescription: a.shortDescription ?? '',
    description: a.description ?? '',
    compatibleWith: [s.slug],
  }))
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Try Sanity first; fall back to static data
  const sanityProduct = await sanityFetch<SanityProduct>(
    PRODUCT_BY_SLUG_QUERY,
    { slug }
  )

  let product: Product
  let accessories: Accessory[]

  if (sanityProduct) {
    product = sanityToProduct(sanityProduct)
    accessories = sanityToAccessories(sanityProduct)
  } else {
    const staticProduct = getProductBySlug(slug)
    if (!staticProduct) notFound()
    product = staticProduct
    accessories = getAccessoriesForProduct(slug)
  }

  // JSON-LD structured data
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Traxon ${product.name}`,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Traxon' },
    manufacturer: { '@type': 'Organization', name: 'Traxon Industrial Carriers' },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Max Payload', value: `${product.specs.payload} lbs` },
      { '@type': 'PropertyValue', name: 'Width', value: `${product.specs.width} mm` },
      { '@type': 'PropertyValue', name: 'Max Gradient', value: `${product.specs.gradient}%` },
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://traxon.com/products/${product.slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://traxon.com' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://traxon.com/products' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://traxon.com/products/${product.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-black pt-20">
        <div className="container-traxon">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-seam">
            {/* Left: Sticky Rail */}
            <StickyRail
              productName={product.name}
              slug={product.slug}
              tier={product.tier}
              capacity={`${product.specs.payload.toLocaleString()} lbs`}
              specs={product.specs}
            />

            {/* Right: Scrollable content */}
            <div className="flex-1 min-w-0 py-10 lg:py-16 space-y-24">
              {/* Product hero / model viewer */}
              <ProductDetailClient product={product} />

              {/* Specifications */}
              <section id="specs">
                <h2 className="font-display text-[28px] text-white uppercase mb-8 pb-4 border-b border-border">
                  Full Specifications
                </h2>
                <SpecTable specs={product.specs} />
              </section>

              {/* Video placeholder */}
              <section id="video">
                <h2 className="font-display text-[28px] text-white uppercase mb-8 pb-4 border-b border-border">
                  In Action
                </h2>
                <div className="aspect-video bg-surface-2 border border-border rounded-[3px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-border-2 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-muted ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="font-label text-mono-sm uppercase tracking-widest text-muted">
                      Video Coming Soon
                    </p>
                  </div>
                </div>
              </section>

              {/* Accessories */}
              {accessories.length > 0 && (
                <section id="accessories">
                  <h2 className="font-display text-[28px] text-white uppercase mb-3 pb-4 border-b border-border">
                    Accessories & Options
                  </h2>
                  <p className="font-body text-body-sm text-muted font-light mb-8">
                    Select accessories to add to your quote request.
                  </p>
                  <AccessoriesGrid
                    accessories={accessories}
                    productSlug={product.slug}
                  />
                </section>
              )}

              {/* Competitive comparison */}
              {product.competitorComparison && (
                <section id="compare">
                  <h2 className="font-display text-[28px] text-white uppercase mb-8 pb-4 border-b border-border">
                    How We Compare
                  </h2>
                  <CompareStrip
                    productName={product.name}
                    specs={product.specs}
                    competitor={product.competitorComparison}
                  />
                </section>
              )}

              {/* Final CTA */}
              <section className="bg-surface border border-border p-8 lg:p-12 relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(0,194,255,0.05), transparent)',
                  }}
                />
                <div className="relative z-[1]">
                  <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue mb-3">
                    Ready to Move?
                  </p>
                  <h3 className="font-display text-[36px] lg:text-[48px] text-white leading-none mb-6">
                    Get a Quote for
                    <br />
                    the {product.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`/contact?intent=quote&product=${product.slug}`}
                      className="inline-flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 transition-all duration-200"
                    >
                      Request a Quote
                    </a>
                    {product.specSheetUrl && (
                      <a
                        href={product.specSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200"
                      >
                        Download Spec Sheet
                      </a>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
