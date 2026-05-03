'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  distance?: number
  threshold?: number
  className?: string
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  threshold = 0.8,
  className,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) {
        gsap.set(el, { opacity: 1, x: 0, y: 0 })
        return
      }

      const initialX =
        direction === 'left' ? -distance : direction === 'right' ? distance : 0
      const initialY = direction === 'up' ? distance : 0

      gsap.set(el, { opacity: 0, x: initialX, y: initialY })

      ScrollTrigger.create({
        trigger: el,
        start: `top ${threshold * 100}%`,
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            delay,
            ease: 'power2.out',
          })
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
