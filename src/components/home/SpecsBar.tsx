'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Badge from '@/components/ui/Badge'

gsap.registerPlugin(ScrollTrigger)

const SPECS = [
  {
    value: '4,000',
    unit: 'lbs',
    label: 'Max Payload',
    sublabel: 'Scarab X5',
    badge: '+50% vs Aconda',
    show: 'always',
  },
  {
    value: '1,000',
    unit: 'mm',
    label: 'Track Width',
    sublabel: 'Confined Space Ready',
    badge: null,
    show: 'always',
  },
  {
    value: '45',
    unit: '°',
    label: 'Max Gradient',
    sublabel: 'Any Terrain',
    badge: null,
    show: 'always',
  },
  {
    value: '280',
    unit: 'Ah',
    label: 'Battery',
    sublabel: 'Full Shift Runtime',
    badge: '+40% vs Aconda',
    show: 'md',
  },
  {
    value: 'Full Prop.',
    unit: '',
    label: 'Control',
    sublabel: 'Wireless Remote',
    badge: null,
    show: 'lg',
  },
] as const

export default function SpecsBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      const cols = barRef.current?.querySelectorAll('.spec-col')
      if (!cols) return

      if (prefersReducedMotion) {
        gsap.set(cols, { opacity: 1, y: 0 })
        return
      }

      gsap.set(cols, { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: barRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(cols, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
          })
        },
      })
    },
    { scope: barRef }
  )

  return (
    <div
      ref={barRef}
      className="relative w-full bg-surface border-t border-b border-border"
    >
      {/* Top gradient accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,194,255,0.5), transparent)',
        }}
      />

      <div className="container-traxon">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {SPECS.map(({ value, unit, label, sublabel, badge, show }, i) => (
            <div
              key={label}
              className={[
                'spec-col',
                'flex flex-col items-center justify-center text-center',
                'py-6 px-4',
                'border-r border-border last:border-r-0',
                'hover:bg-surface-2 transition-colors duration-150 cursor-default',
                show === 'md' ? 'hidden md:flex' : '',
                show === 'lg' ? 'hidden lg:flex' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="flex items-baseline gap-1 leading-none mb-1.5">
                <span className="font-display text-display-sm text-white">
                  {value}
                </span>
                {unit && (
                  <span className="font-display text-[20px] text-blue">
                    {unit}
                  </span>
                )}
              </div>
              <span className="font-label text-mono-sm uppercase tracking-[0.2em] text-muted mb-2">
                {sublabel}
              </span>
              {badge && (
                <Badge variant="blue" className="text-[9px]">
                  {badge}
                </Badge>
              )}
              {!badge && (
                <span className="font-label text-mono-sm uppercase tracking-[0.2em] text-border-2">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
