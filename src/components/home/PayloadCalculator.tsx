'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

type ModelResult = 'scarab-x5' | 'custom' | null

const MODEL_INFO = {
  'scarab-x5': {
    name: 'SCARAB X5',
    capacity: '4,000 lbs',
    reason: 'This is exactly what the Scarab X5 was built for. Maximum payload, tightest corridor specs, any gradient.',
    color: 'text-blue',
    href: '/products/scarab-x5',
    flagship: true,
  },
  custom: {
    name: 'Custom Solution',
    capacity: '4,000+ lbs',
    reason: 'Your job needs a custom solution. Let\'s talk — our engineering team builds bespoke configurations for extreme payloads.',
    color: 'text-mild',
    href: '/contact?intent=quote&product=custom',
  },
}

function recommendModel(payload: number, width: number): ModelResult {
  if (payload > 4000 || width < 800) return 'custom'
  return 'scarab-x5'
}

export default function PayloadCalculator() {
  const [payload, setPayload] = useState(2000)
  const [width, setWidth] = useState(1000)
  const [gradient, setGradient] = useState(30)
  const [result, setResult] = useState<ModelResult>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pPayload = params.get('payload')
    const pWidth = params.get('width')
    const pGradient = params.get('gradient')
    if (pPayload || pWidth || pGradient) {
      const p = pPayload ? Math.min(6000, Math.max(0, Number(pPayload))) : payload
      const w = pWidth ? Math.min(2000, Math.max(600, Number(pWidth))) : width
      const g = pGradient ? Math.min(45, Math.max(0, Number(pGradient))) : gradient
      setPayload(p)
      setWidth(w)
      setGradient(g)
      setResult(recommendModel(p, w))
      setHasInteracted(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCalculate() {
    const r = recommendModel(payload, width)
    setResult(r)
    setHasInteracted(true)
    // Update shareable URL
    const params = new URLSearchParams()
    params.set('payload', String(payload))
    params.set('width', String(width))
    params.set('gradient', String(gradient))
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  const model = result ? MODEL_INFO[result] : null

  return (
    <section className="section-padding bg-black">
      <div className="container-traxon">
        <RevealOnScroll direction="left" className="mb-3">
          <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
            Payload Calculator
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.08} className="mb-4">
          <h2 className="font-display text-display-md text-white leading-none">
            Find Your Machine
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.16} className="mb-12">
          <p className="font-body text-body-lg text-muted font-light max-w-[480px]">
            Enter your job specs. We&apos;ll tell you if the Scarab X5 is built
            for it.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Inputs */}
          <RevealOnScroll>
            <div className="flex flex-col gap-8">
              {/* Payload slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-label text-mono-label uppercase tracking-[0.2em] text-muted">
                    Payload Weight
                  </label>
                  <span className="font-display text-[22px] text-white leading-none">
                    {payload.toLocaleString()}
                    <span className="text-blue text-[14px] ml-1">lbs</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={6000}
                  step={100}
                  value={payload}
                  onChange={(e) => {
                    setPayload(Number(e.target.value))
                    setHasInteracted(false)
                    setResult(null)
                  }}
                  className="w-full h-0.5 bg-border-2 appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--color-blue) ${(payload / 6000) * 100}%, var(--color-border-2) ${(payload / 6000) * 100}%)`,
                  }}
                  aria-label="Payload weight in pounds"
                />
                <div className="flex justify-between mt-1.5">
                  <span className="font-label text-mono-sm text-muted">0 lbs</span>
                  <span className="font-label text-mono-sm text-muted">6,000 lbs</span>
                </div>
              </div>

              {/* Corridor width */}
              <div>
                <label className="block font-label text-mono-label uppercase tracking-[0.2em] text-muted mb-3">
                  Corridor / Doorway Width
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={600}
                    max={2000}
                    value={width}
                    onChange={(e) => {
                      setWidth(Number(e.target.value))
                      setHasInteracted(false)
                      setResult(null)
                    }}
                    className="w-full bg-surface border border-border text-white font-body text-body-md px-4 py-3 rounded-[3px] focus:outline-none focus:border-blue transition-colors duration-200"
                    aria-label="Corridor or doorway width in millimetres"
                  />
                  <span className="font-label text-mono-label text-muted whitespace-nowrap">
                    mm
                  </span>
                </div>
              </div>

              {/* Max gradient */}
              <div>
                <label className="block font-label text-mono-label uppercase tracking-[0.2em] text-muted mb-3">
                  Maximum Gradient
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={45}
                    value={gradient}
                    onChange={(e) => {
                      setGradient(Number(e.target.value))
                      setHasInteracted(false)
                      setResult(null)
                    }}
                    className="w-full bg-surface border border-border text-white font-body text-body-md px-4 py-3 rounded-[3px] focus:outline-none focus:border-blue transition-colors duration-200"
                    aria-label="Maximum gradient in degrees"
                  />
                  <span className="font-label text-mono-label text-muted whitespace-nowrap">
                    degrees
                  </span>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 hover:-translate-y-px transition-all duration-200 cursor-pointer self-start"
              >
                Find My Machine →
              </button>
            </div>
          </RevealOnScroll>

          {/* Result panel */}
          <div className="flex items-start">
            <AnimatePresence mode="wait">
              {!hasInteracted ? (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full border border-border p-8 flex flex-col items-center justify-center text-center min-h-[280px]"
                >
                  <div
                    className="w-12 h-12 border border-border-2 flex items-center justify-center mb-5"
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4V10L14 14" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="10" cy="10" r="8" stroke="var(--color-muted)" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <p className="font-label text-mono-label uppercase tracking-[0.2em] text-muted">
                    Enter your specs above
                  </p>
                  <p className="font-body text-body-sm text-muted font-light mt-2">
                    We&apos;ll recommend the right Scarab for your job.
                  </p>
                </motion.div>
              ) : model ? (
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className={[
                    'w-full p-8 border',
                    result === 'scarab-x5' ? 'border-blue bg-[var(--color-blue-dim)]' : 'border-border-2 bg-surface',
                  ].join(' ')}
                >
                  <p className="font-label text-mono-sm uppercase tracking-[0.2em] text-muted mb-4">
                    Recommended Machine
                  </p>
                  <h3 className={`font-display text-[48px] leading-none mb-2 ${model.color}`}>
                    {model.name}
                  </h3>
                  <p className="font-display text-[20px] text-blue mb-5">
                    {model.capacity}
                  </p>
                  <p className="font-body text-body-sm text-mild font-light leading-relaxed mb-7">
                    {model.reason}
                  </p>
                  <Link
                    href={`/contact?intent=quote&product=${result}&payload=${payload}&width=${width}&gradient=${gradient}`}
                    className="inline-flex items-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest px-6 py-3.5 rounded-[3px] hover:opacity-85 transition-opacity duration-200"
                  >
                    Get a Quote for the {model.name} →
                  </Link>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
