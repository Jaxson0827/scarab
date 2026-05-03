'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CountUpProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export default function CountUp({
  target,
  duration = 1800,
  suffix,
  prefix,
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      el.textContent = `${prefix ?? ''}${target.toLocaleString()}${suffix ?? ''}`
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            observer.disconnect()

            const obj = { value: 0 }
            gsap.to(obj, {
              value: target,
              duration: duration / 1000,
              ease: 'power2.out',
              onUpdate() {
                const val =
                  decimals > 0
                    ? obj.value.toFixed(decimals)
                    : Math.round(obj.value).toLocaleString()
                el.textContent = `${prefix ?? ''}${val}${suffix ?? ''}`
              },
              onComplete() {
                const finalVal =
                  decimals > 0
                    ? target.toFixed(decimals)
                    : target.toLocaleString()
                el.textContent = `${prefix ?? ''}${finalVal}${suffix ?? ''}`
              },
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, suffix, prefix, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix ?? ''}0{suffix ?? ''}
    </span>
  )
}
