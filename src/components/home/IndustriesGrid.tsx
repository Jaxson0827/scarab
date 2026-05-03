'use client'

import Link from 'next/link'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

const INDUSTRIES = [
  {
    slug: 'renewable-energy',
    title: 'Renewable Energy',
    description:
      'Transport pad-mounted transformers and generator sets across terrain forklifts can\'t reach.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 4L24 16H36L26 24L30 36L20 28L10 36L14 24L4 16H16L20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <path d="M20 8L23 17H32L25 22L28 31L20 26L12 31L15 22L8 17H17L20 8Z" fill="currentColor" opacity="0.15"/>
      </svg>
    ),
  },
  {
    slug: 'construction',
    title: 'Construction & Civil',
    description:
      'Move structural steel and HVAC units through unfinished corridors. Eliminate crane lifts where space won\'t allow.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="24" width="28" height="12" rx="0" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 24V10H30V24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 24V16H26V24" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17 24V19H23V24" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="6" y1="10" x2="34" y2="10" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    slug: 'mining',
    title: 'Mining & Quarrying',
    description:
      'Navigate underground passages with full load capacity. Built for the harshest operating environments.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 32L20 8L32 32" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 28H28" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 8V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 22L20 10L26 22" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        <circle cx="20" cy="34" r="2" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
  {
    slug: 'industrial-maintenance',
    title: 'Industrial Maintenance',
    description:
      'Swap out turbines and industrial plant in-situ. No demolition required.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M28 8C28 8 32 12 32 16C32 20 28 22 24 20L12 32C10 34 8 34 7 33C6 32 6 30 8 28L20 16C18 12 20 8 24 8C26 8 27 8 28 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="10" cy="30" r="2" fill="currentColor" opacity="0.7"/>
        <line x1="25" y1="11" x2="29" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    slug: 'commercial-facilities',
    title: 'Commercial Facilities',
    description:
      'Rooftop equipment, basement plant rooms, server buildouts. Any load, any floor.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="12" width="24" height="24" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12L20 4L32 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="12" y="20" width="5" height="5" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
        <rect x="23" y="20" width="5" height="5" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
        <rect x="17" y="28" width="6" height="8" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    slug: 'live-events',
    title: 'Live Events & Production',
    description:
      'Stage equipment and rigging gear moved through venues and arenas with precision remote control.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="28" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 14L12 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M32 14L28 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 24H32" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 36H30" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

export default function IndustriesGrid() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-traxon">
        {/* Header */}
        <RevealOnScroll direction="left" className="mb-3">
          <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
            Industries
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.08} className="mb-14">
          <h2 className="font-display text-display-lg text-white leading-none">
            Every Job Site.
            <br />
            Every Sector.
          </h2>
        </RevealOnScroll>

        {/* 3×2 grid with 2px seam gaps */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '2px', background: 'var(--color-black)' }}
        >
          {INDUSTRIES.map(({ slug, title, description, icon }, i) => (
            <RevealOnScroll key={slug} delay={i * 0.06}>
              <Link
                href={`/industries/${slug}`}
                className="group relative block bg-surface p-8 h-full transition-colors duration-200 hover:bg-surface-2 overflow-hidden"
              >
                {/* Blue bottom border — slides in from left on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="text-blue mb-5 transition-colors duration-200">
                  {icon}
                </div>

                {/* Title */}
                <h3 className="font-display text-[22px] text-white leading-tight mb-3">
                  {title}
                </h3>

                {/* Description */}
                <p className="font-body text-body-sm text-muted font-light leading-relaxed mb-6">
                  {description}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-2 font-label text-mono-sm uppercase tracking-[0.2em] text-muted group-hover:text-blue transition-colors duration-200">
                  View Solutions
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
