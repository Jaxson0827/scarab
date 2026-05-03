'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUp from '@/components/animations/CountUp'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { value: 50, suffix: '%', label: 'More payload than nearest tracked carrier competitor' },
  { value: 40, suffix: '%', label: 'More battery runtime vs Aconda 4000 PRO' },
  { value: 6, suffix: '', label: 'Industries served across North American job sites' },
]

export default function SocialProof() {
  const metricsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      const items = metricsRef.current?.querySelectorAll('.metric-item')
      if (!items || prefersReducedMotion) return

      gsap.set(items, { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: metricsRef.current,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15,
          })
        },
      })
    },
    { scope: metricsRef }
  )

  return (
    <section aria-label="Social proof and statistics">
      <div className="flex flex-col lg:flex-row">
        {/* Left panel — testimonial (blue background) */}
        <div className="lg:w-1/2 bg-blue p-12 lg:p-16 flex items-center">
          <RevealOnScroll>
            <blockquote>
              <p className="font-body text-body-lg text-black font-light leading-relaxed mb-8">
                &ldquo;We had a 5,200 lbs transformer to move through a 980mm
                doorway, three floors underground. The Scarab X5 did it in four
                hours. Nothing else on the market would have touched that
                job.&rdquo;
              </p>
              <footer>
                <cite className="font-label text-mono-label not-italic uppercase tracking-[0.2em] text-black opacity-70">
                  Project Manager — Utility Infrastructure Division
                </cite>
              </footer>
            </blockquote>
          </RevealOnScroll>
        </div>

        {/* Right panel — metrics */}
        <div
          ref={metricsRef}
          className="lg:w-1/2 bg-surface-2 p-12 lg:p-16 flex flex-col justify-center"
        >
          {METRICS.map(({ value, suffix, label }, i) => (
            <div
              key={label}
              className={[
                'metric-item flex flex-col py-8',
                i > 0 ? 'border-t border-border' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ opacity: 0 }}
            >
              <div className="flex items-baseline gap-1 leading-none mb-2">
                <CountUp
                  target={value}
                  duration={1600}
                  className="font-display text-[64px] text-white"
                />
                {suffix && (
                  <span className="font-display text-[40px] text-blue">
                    {suffix}
                  </span>
                )}
              </div>
              <p className="font-body text-body-sm text-muted font-light leading-relaxed max-w-[320px]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
