'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ScanLine() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    gsap.fromTo(
      el,
      { top: '-2px' },
      {
        top: '100%',
        duration: 8,
        ease: 'power1.inOut',
        repeat: -1,
      }
    )
  }, [])

  return (
    <div
      ref={lineRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 right-0 z-[2]"
      style={{
        height: '2px',
        background:
          'linear-gradient(90deg, transparent, #00c2ff, transparent)',
        opacity: 0.4,
      }}
    />
  )
}
