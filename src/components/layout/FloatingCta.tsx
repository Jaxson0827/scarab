'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

export default function FloatingCta() {
  const [visible, setVisible] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Show after 600px scroll; hide when footer CTA is visible
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide when the final CTA section enters viewport
  useEffect(() => {
    const footerCta = document.getElementById('final-cta')
    if (!footerCta) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(false)
      },
      { threshold: 0.1 }
    )
    observer.observe(footerCta)
    return () => observer.disconnect()
  }, [])

  // Idle pulse animation
  useEffect(() => {
    const el = ctaRef.current
    if (!el || !visible) return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const tween = gsap.to(el, {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
    return () => {
      tween.kill()
      gsap.set(el, { scale: 1 })
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-8 right-8 lg:bottom-8 lg:right-8 bottom-5 right-4 z-[99]"
          style={{ willChange: 'transform' }}
        >
          <Link
            href="/contact?intent=quote"
            className="flex items-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest px-6 py-3.5 rounded-[3px] hover:scale-[1.03] hover:opacity-90 transition-all duration-200 whitespace-nowrap"
            style={{ boxShadow: '0 8px 32px rgba(0, 194, 255, 0.3)' }}
          >
            Get a Quote →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
