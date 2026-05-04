'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScanLine from '@/components/animations/ScanLine'

const STATS = [
  { value: 4000, formatted: '4,000', unit: 'lbs', label: 'Max Payload' },
  { value: 45, formatted: '45', unit: '°', label: 'Max Gradient' },
  { value: 39, formatted: '39', unit: 'in', label: 'Track Width' },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const overlineRef = useRef<HTMLParagraphElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsContainerRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      const allTextEls = [
        overlineRef.current,
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        subRef.current,
        ctaRef.current,
        scrollIndicatorRef.current,
      ]

      if (prefersReducedMotion) {
        gsap.set(allTextEls, { opacity: 1, y: 0, x: 0 })
        gsap.set(statsContainerRef.current, { opacity: 1, y: 0 })
        statNumberRefs.current.forEach((el, i) => {
          if (el) el.textContent = STATS[i].formatted
        })
        return
      }

      const tl = gsap.timeline()

      tl.fromTo(
        overlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.1
      )
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.25
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.35
        )
        .fromTo(
          line3Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.45
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.6
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.75
        )

      // Stats cluster — fades up below CTAs
      if (statsContainerRef.current) {
        const children = Array.from(statsContainerRef.current.children)
        gsap.fromTo(
          children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 1.0,
          }
        )
      }

      // Animate stat numbers (independent of opacity)
      statNumberRefs.current.forEach((el, i) => {
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: STATS[i].value,
          duration: 1.8,
          delay: 1.0 + i * 0.1,
          ease: 'power2.out',
          onUpdate() {
            if (el)
              el.textContent = Math.round(obj.val).toLocaleString()
          },
          onComplete() {
            if (el) el.textContent = STATS[i].formatted
          },
        })
      })

      // Scroll indicator fade in + pulse
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: 1.2 }
      )
      gsap.to(
        scrollIndicatorRef.current?.querySelector('.scroll-pulse') ?? null,
        {
          opacity: 0.15,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 1.6,
        }
      )
    },
    { scope: containerRef }
  )

  // Fade scroll indicator when user scrolls past 200px
  useEffect(() => {
    const el = scrollIndicatorRef.current
    if (!el) return
    const handleScroll = () => {
      gsap.to(el, {
        opacity: window.scrollY > 200 ? 0 : 1,
        duration: 0.3,
        overwrite: 'auto',
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100svh', minHeight: '640px' }}
      aria-label="Hero — Traxon Scarab X5"
    >
      {/* Layer 1 — CSS grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.3,
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Layer 2 — Blue radial glow blob */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 35%, rgba(0,194,255,0.05), transparent 70%)',
        }}
      />

      {/* Layer 3 — Animated scan line */}
      <ScanLine />

      {/* Product image — right side, desktop only */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-[5] hidden md:block"
        style={{ width: '50%' }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/products/scarab-x5-hero-34-angle.png"
            alt="Scarab X5 Industrial Tracked Carrier"
            fill
            priority
            className="object-contain object-bottom"
            sizes="50vw"
          />
          {/* Left-edge fade — machine emerges from darkness */}
          <div
            className="absolute inset-y-0 left-0 w-[40%] pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
              background: '#080a0d',
            }}
          />
        </div>
      </div>

      {/* Main content + stats row — absolute bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-[10] pb-12">
        <div className="container-traxon flex items-end justify-between gap-8">
          {/* Content — left */}
          <div className="flex-1 min-w-0 max-w-[600px]">
            <p
              ref={overlineRef}
              style={{ opacity: 0, letterSpacing: '4px' }}
              className="font-label text-mono-label uppercase text-blue mb-6"
            >
              American-Engineered Industrial Carriers
            </p>

            <div className="leading-[0.9] mb-7" style={{ position: 'relative', zIndex: 1 }}>
              <div
                ref={line1Ref}
                style={{ opacity: 0 }}
                className="font-display text-display-xl text-white block"
              >
                MOVE THE
              </div>
              <div
                ref={line2Ref}
                style={{ opacity: 0 }}
                className="font-display text-display-xl text-blue block"
              >
                IMPOSSIBLE.
              </div>
              <div
                ref={line3Ref}
                style={{ opacity: 0, WebkitTextStroke: '1px rgba(240,243,247,0.2)', color: 'transparent' }}
                className="font-display text-display-xl block"
              >
                LOAD.
              </div>
            </div>

            <p
              ref={subRef}
              style={{ opacity: 0 }}
              className="font-body text-body-lg text-mild font-light max-w-[520px] leading-relaxed mb-8"
            >
              The Traxon Scarab X5 carries 4,000 lbs through spaces other
              machines can&apos;t enter. 50% more payload than the nearest
              competitor. Built for the jobs that don&apos;t have a plan B.
            </p>

            <div
              ref={ctaRef}
              style={{ opacity: 0 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-8"
            >
              <Link
                href="/products/scarab-x5"
                className="inline-flex items-center justify-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 hover:-translate-y-px transition-all duration-200 whitespace-nowrap"
              >
                See the Scarab X5
              </Link>
              <Link
                href="/contact?intent=demo"
                className="inline-flex items-center justify-center gap-2 border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                Request a Demo
              </Link>
            </div>

            {/* Stats cluster — below CTAs, desktop only, horizontal */}
            <div
              ref={statsContainerRef}
              aria-label="Key specifications"
              className="hidden lg:flex items-center gap-0"
            >
              {STATS.map(({ formatted, unit, label }, i) => (
                <div key={label} className="flex items-center">
                  <div style={{ opacity: 0 }} className="flex flex-col pr-6">
                    <div className="flex items-baseline gap-0.5 leading-none mb-1">
                      <span
                        ref={(el) => { statNumberRefs.current[i] = el }}
                        className="font-display text-[32px] text-white"
                      >
                        0
                      </span>
                      <span className="font-display text-[20px] text-blue">{unit}</span>
                    </div>
                    <span className="font-label text-mono-sm uppercase tracking-[0.2em] text-muted">
                      {label}
                    </span>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="w-px h-8 bg-border mr-6 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <div
        ref={scrollIndicatorRef}
        style={{ opacity: 0 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-3"
      >
        <span
          className="font-label text-[9px] text-muted uppercase tracking-[0.25em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div
          className="scroll-pulse w-px bg-muted"
          style={{ height: '48px', opacity: 0.6 }}
        />
      </div>
    </section>
  )
}
