'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'traxon-exit-intent-shown'

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false)
  const [hasShown, setHasShown] = useState(true) // start true to avoid flash

  useEffect(() => {
    // Only show once per session
    const shown = sessionStorage.getItem(STORAGE_KEY)
    setHasShown(!!shown)
  }, [])

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Trigger when cursor exits through the top of the viewport
      if (e.clientY <= 10 && !hasShown) {
        setOpen(true)
        setHasShown(true)
        sessionStorage.setItem(STORAGE_KEY, '1')
      }
    },
    [hasShown]
  )

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [handleMouseLeave])

  function close() {
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="exit-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Before you go"
            className="fixed inset-0 z-[201] flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="relative w-full max-w-[520px] bg-surface border border-border-2 pointer-events-auto overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue" aria-hidden="true" />

              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,194,255,0.06), transparent)',
                }}
              />

              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 text-muted hover:text-white transition-colors duration-150 z-[1]"
                aria-label="Close"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="relative z-[1] p-8 lg:p-10">
                <p className="font-label text-mono-sm uppercase tracking-[0.2em] text-blue mb-4">
                  Before you go
                </p>

                <h2 className="font-display text-[44px] lg:text-[52px] text-white leading-none mb-4">
                  Get a Quote
                  <br />
                  in 60 Seconds.
                </h2>

                <p className="font-body text-body-sm text-muted font-light leading-relaxed mb-8 max-w-[380px]">
                  Tell us your payload, your corridor width, and your timeline.
                  We&apos;ll recommend the right Scarab and have a quote to you within 4 hours.
                </p>

                {/* Stats */}
                <div className="flex gap-8 mb-8 pb-6 border-b border-border">
                  {[
                    { value: '4 hrs', label: 'Quote turnaround' },
                    { value: '60s', label: 'To complete the form' },
                    { value: '$0', label: 'Commitment required' },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-[22px] text-blue leading-none">{s.value}</p>
                      <p className="font-label text-[10px] uppercase tracking-widest text-muted mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact?intent=quote"
                    onClick={close}
                    className="flex-1 flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest py-4 rounded-[3px] hover:opacity-85 transition-all duration-200"
                  >
                    Get a Quote →
                  </Link>
                  <button
                    onClick={close}
                    className="flex-1 flex items-center justify-center border border-border-2 text-muted font-label text-[12px] uppercase tracking-widest py-4 rounded-[3px] hover:border-border hover:text-mild transition-all duration-200"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
