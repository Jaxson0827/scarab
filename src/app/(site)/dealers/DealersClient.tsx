'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { DEALERS } from '@/lib/dealers'
import type { Dealer } from '@/lib/dealers'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

const DealerMap = dynamic(() => import('@/components/dealers/DealerMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-2 border border-border flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue/30 border-t-blue rounded-full animate-spin" />
    </div>
  ),
})

const COUNTRIES = ['All', ...Array.from(new Set(DEALERS.map((d) => d.country))).sort()]

export default function DealersClient() {
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return DEALERS.filter((d) => {
      if (selectedCountry !== 'All' && d.country !== selectedCountry) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          d.name.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [selectedCountry, search])

  const selectedDealer = DEALERS.find((d) => d.id === selectedId) ?? null

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.15,
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="container-traxon relative z-[1]">
          <RevealOnScroll direction="left" className="mb-3">
            <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
              Dealers
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08} className="mb-4">
            <h1 className="font-display text-display-lg text-white leading-none">
              Find a Dealer
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.14}>
            <p className="font-body text-body-lg text-muted font-light max-w-[480px] leading-relaxed">
              Authorized Traxon distributors, service centres, and rental partners across North America, Europe, and Australia.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Map + Dealer list */}
      <section className="bg-black border-t border-border">
        <div className="container-traxon">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-seam min-h-[600px]">

            {/* Map */}
            <div className="h-[400px] lg:h-auto lg:min-h-[600px] relative">
              <DealerMap
                dealers={filtered}
                selectedId={selectedId}
                onSelectDealer={setSelectedId}
              />
            </div>

            {/* Dealer panel */}
            <div className="flex flex-col border-l border-border">
              {/* Search + filter */}
              <div className="p-5 border-b border-border space-y-3">
                <input
                  type="text"
                  placeholder="Search by city, state, or name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-surface border border-border px-4 py-3 font-body text-body-sm text-text placeholder:text-muted focus:outline-none focus:border-blue transition-colors duration-150"
                />
                <div className="flex flex-wrap gap-1.5">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCountry(c)}
                      className={[
                        'font-label text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-[2px] transition-all duration-150',
                        selectedCountry === c
                          ? 'bg-blue text-black'
                          : 'bg-surface border border-border text-muted hover:border-border-2',
                      ].join(' ')}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dealer list */}
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {filtered.map((dealer) => (
                  <DealerCard
                    key={dealer.id}
                    dealer={dealer}
                    isSelected={selectedId === dealer.id}
                    onClick={() => setSelectedId(dealer.id === selectedId ? null : dealer.id)}
                  />
                ))}
                {filtered.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="font-body text-body-sm text-muted font-light">
                      No dealers found.
                    </p>
                  </div>
                )}
              </div>

              {/* Selected dealer detail panel */}
              <AnimatePresence>
                {selectedDealer && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-blue/30"
                  >
                    <div className="p-6 bg-surface-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-label text-mono-sm uppercase tracking-widest text-blue mb-1">
                            {selectedDealer.country} · {selectedDealer.state}
                          </p>
                          <h3 className="font-body text-body-lg text-white font-light">
                            {selectedDealer.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedId(null)}
                          className="text-muted hover:text-white transition-colors duration-150 mt-1"
                          aria-label="Close"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-2 mb-5">
                        <p className="font-body text-body-sm text-muted font-light">
                          {selectedDealer.address}
                        </p>
                        <a
                          href={`tel:${selectedDealer.phone}`}
                          className="block font-body text-body-sm text-mild hover:text-blue transition-colors duration-150"
                        >
                          {selectedDealer.phone}
                        </a>
                        <a
                          href={`mailto:${selectedDealer.email}`}
                          className="block font-body text-body-sm text-mild hover:text-blue transition-colors duration-150"
                        >
                          {selectedDealer.email}
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {selectedDealer.isDistributor && (
                          <span className="font-label text-[10px] uppercase tracking-widest bg-blue/10 text-blue border border-blue/20 px-2 py-1">
                            Distributor
                          </span>
                        )}
                        {selectedDealer.isService && (
                          <span className="font-label text-[10px] uppercase tracking-widest bg-surface border border-border text-muted px-2 py-1">
                            Service
                          </span>
                        )}
                        {selectedDealer.isRental && (
                          <span className="font-label text-[10px] uppercase tracking-widest bg-surface border border-border text-muted px-2 py-1">
                            Rental
                          </span>
                        )}
                      </div>
                      <a
                        href={`mailto:${selectedDealer.email}?subject=Traxon Quote Request`}
                        className="w-full flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest py-3 rounded-[3px] hover:opacity-85 transition-all duration-200"
                      >
                        Contact This Dealer
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Dealer */}
      <section className="section-padding bg-surface border-t border-border" id="become-a-dealer">
        <div className="container-traxon">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Benefits */}
            <div>
              <RevealOnScroll className="mb-4">
                <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
                  Dealer Programme
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06} className="mb-8">
                <h2 className="font-display text-[40px] lg:text-[52px] text-white leading-none">
                  Become a
                  <br />
                  Traxon Dealer
                </h2>
              </RevealOnScroll>
              <div className="space-y-4">
                {[
                  { title: 'Exclusive Territory', body: 'Protected dealer territories with first-right-of-refusal on adjacent regions as your business grows.' },
                  { title: 'Demo Machine Programme', body: 'Subsidised demo unit for customer trials and in-field demonstrations. First move often closes the sale.' },
                  { title: 'Technical Training', body: 'Comprehensive factory training programme — 3 days at our facility. Full remote support thereafter.' },
                  { title: 'Co-Marketing', body: 'Traxon contributes to local marketing budgets. Trade show support, branded collateral, and digital assets provided.' },
                ].map((item, i) => (
                  <RevealOnScroll key={item.title} delay={i * 0.06} direction="left">
                    <div className="flex items-start gap-4">
                      <span className="text-blue mt-1 shrink-0">✓</span>
                      <div>
                        <p className="font-body text-body-sm text-white font-medium mb-1">{item.title}</p>
                        <p className="font-body text-body-sm text-muted font-light leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Application form */}
            <RevealOnScroll delay={0.1} direction="left">
              <div className="bg-black border border-border p-8">
                <p className="font-label text-mono-label uppercase tracking-widest text-white mb-6">
                  Dealer Application
                </p>
                <DealerApplicationForm />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Dealer card ──────────────────────────────────────────────────────────

function DealerCard({
  dealer,
  isSelected,
  onClick,
}: {
  dealer: Dealer
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'w-full text-left px-5 py-4 transition-colors duration-150',
        isSelected ? 'bg-blue-dim border-l-2 border-blue' : 'hover:bg-surface-2',
      ].join(' ')}
    >
      <p className="font-label text-[10px] uppercase tracking-widest text-muted mb-1">
        {dealer.city}, {dealer.state} · {dealer.country}
      </p>
      <p className={['font-body text-body-sm font-light', isSelected ? 'text-white' : 'text-mild'].join(' ')}>
        {dealer.name}
      </p>
    </button>
  )
}

// ─── Dealer application form ──────────────────────────────────────────────

function DealerApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-blue/10 border border-blue/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-blue text-xl">✓</span>
        </div>
        <p className="font-body text-body-lg text-white font-light mb-2">Application Received</p>
        <p className="font-body text-body-sm text-muted font-light">
          Our dealer development team will be in touch within 2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="First Name"
          required
          className="bg-surface border border-border px-4 py-3 font-body text-body-sm text-text placeholder:text-muted focus:outline-none focus:border-blue transition-colors duration-150 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          className="bg-surface border border-border px-4 py-3 font-body text-body-sm text-text placeholder:text-muted focus:outline-none focus:border-blue transition-colors duration-150 w-full"
        />
      </div>
      <input
        type="text"
        placeholder="Company Name"
        required
        className="bg-surface border border-border px-4 py-3 font-body text-body-sm text-text placeholder:text-muted focus:outline-none focus:border-blue transition-colors duration-150 w-full"
      />
      <input
        type="text"
        placeholder="Region / Territory of Interest"
        required
        className="bg-surface border border-border px-4 py-3 font-body text-body-sm text-text placeholder:text-muted focus:outline-none focus:border-blue transition-colors duration-150 w-full"
      />
      <input
        type="email"
        placeholder="Email Address"
        required
        className="bg-surface border border-border px-4 py-3 font-body text-body-sm text-text placeholder:text-muted focus:outline-none focus:border-blue transition-colors duration-150 w-full"
      />
      <textarea
        placeholder="Tell us about your business and why you'd be a great Traxon partner…"
        rows={4}
        className="bg-surface border border-border px-4 py-3 font-body text-body-sm text-text placeholder:text-muted focus:outline-none focus:border-blue transition-colors duration-150 w-full resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest py-4 rounded-[3px] hover:opacity-85 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  )
}
