'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import Badge from '@/components/ui/Badge'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    slug: 'scarab-x5',
    name: 'SCARAB X5',
    capacity: '4,000 lbs',
    tier: 'FLAGSHIP',
    tierVariant: 'blue' as const,
    description:
      'The highest-payload tracked carrier in its class. Moves 4,000 lbs through a 1,000mm space that nothing else on the market can touch.',
    specs: [
      { label: 'Track Width', value: '1,000', unit: 'mm' },
      { label: 'Max Gradient', value: '45', unit: '°' },
      { label: 'Battery', value: '280', unit: 'Ah' },
      { label: 'Unit Weight', value: '970', unit: 'lbs' },
    ],
    image: '/images/products/scarab-x5-hero-34-angle.png',
    cta: { label: 'Request a Demo', href: '/contact?intent=demo' },
    flagship: true,
  },
]

export default function ProductLineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      const cards = sectionRef.current?.querySelectorAll('.product-card')
      if (!cards || prefersReducedMotion) return

      gsap.set(cards, { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
          })
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="section-padding bg-black">
      <div className="container-traxon">
        {/* Header */}
        <RevealOnScroll direction="left" className="mb-3">
          <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
            Product Line
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.08} className="mb-4">
          <h2 className="font-display text-display-lg text-white leading-none">
            Built for the Load Nobody
            <br />
            Else Will Touch
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.16} className="mb-14">
          <p className="font-body text-body-lg text-muted font-light max-w-[540px]">
            One machine. One philosophy: more payload, tighter spaces, steeper
            grades than anything else on the market.
          </p>
        </RevealOnScroll>

        {/* Product grid — 2px gap "industrial seam" */}
        <div
          className="grid grid-cols-1"
          style={{ gap: '2px', background: 'var(--color-black)' }}
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    <div
      className={[
        'product-card group',
        'relative flex flex-col lg:flex-row',
        'bg-surface',
        'transition-colors duration-200',
        'hover:bg-surface-2',
        product.flagship ? 'border-t-2 border-blue' : 'border-t border-border',
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        product.flagship
          ? {
              background:
                'radial-gradient(ellipse 80% 60% at 100% 100%, rgba(0,194,255,0.04), transparent 60%), var(--color-surface)',
            }
          : undefined
      }
    >
      {/* Left — content */}
      <div className="flex flex-col p-8 lg:w-[480px] shrink-0">
        {/* Tier badge */}
        <div className="mb-6">
          <Badge variant={product.tierVariant}>{product.tier}</Badge>
        </div>

        {/* Product name */}
        <h3 className="font-display text-[48px] text-white leading-none mb-2">
          {product.name}
        </h3>

        {/* Capacity */}
        <p className="font-display text-[22px] text-blue leading-none mb-5">
          {product.capacity}
        </p>

        {/* Description */}
        <p className="font-body text-body-sm text-muted font-light leading-relaxed mb-8 flex-1">
          {product.description}
        </p>

        {/* 2×2 spec grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8 border-t border-border pt-6">
          {product.specs.map(({ label, value, unit }) => (
            <div key={label}>
              <div className="flex items-baseline gap-0.5 leading-none mb-1">
                <span className="font-display text-[22px] text-white">{value}</span>
                <span className="font-display text-[14px] text-blue">{unit}</span>
              </div>
              <span className="font-label text-mono-sm uppercase tracking-[0.15em] text-muted">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA link */}
        <Link
          href={product.cta.href}
          className={[
            'inline-flex items-center gap-2',
            'font-label text-mono-label uppercase tracking-widest',
            'transition-all duration-200',
            product.flagship ? 'text-blue hover:text-white' : 'text-muted hover:text-white',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span>{product.cta.label}</span>
          <span className="transition-all duration-200 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>

      {/* Right — product image */}
      {product.image && (
        <div className="relative flex-1 min-h-[280px] lg:min-h-0 overflow-hidden bg-surface-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain object-center p-8 transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle left-edge fade to blend with content panel */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-16 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, var(--color-surface), transparent)',
            }}
          />
        </div>
      )}
    </div>
  )
}
