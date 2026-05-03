'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { CASE_STUDIES } from '@/lib/caseStudies'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

const INDUSTRY_LABELS: Record<string, string> = {
  construction: 'Construction',
  mining: 'Mining',
  manufacturing: 'Manufacturing',
  utilities: 'Utilities',
  events: 'Events',
  shipbuilding: 'Shipbuilding',
}

const PRODUCT_LABELS: Record<string, string> = {
  'scarab-x5': 'Scarab X5',
}

const industries = ['all', ...Object.keys(INDUSTRY_LABELS)]
const products = ['all', 'scarab-x5']

export default function CaseStudiesClient() {
  const [industryFilter, setIndustryFilter] = useState('all')
  const [productFilter, setProductFilter] = useState('all')

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter((cs) => {
      if (industryFilter !== 'all' && cs.industry !== industryFilter) return false
      if (productFilter !== 'all' && cs.productSlug !== productFilter) return false
      return true
    })
  }, [industryFilter, productFilter])

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
              Case Studies
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h1 className="font-display text-display-lg text-white leading-none">
              Proof. Not Claims.
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-surface border-y border-border sticky top-[72px] z-30">
        <div className="container-traxon py-4">
          <div className="flex flex-wrap gap-6 items-center">
            {/* Industry filter */}
            <div className="flex items-center gap-2">
              <span className="font-label text-mono-sm uppercase tracking-widest text-muted shrink-0">
                Industry
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustryFilter(ind)}
                    className={[
                      'font-label text-mono-sm uppercase tracking-widest px-3 py-1.5 rounded-[2px] transition-all duration-150',
                      industryFilter === ind
                        ? 'bg-blue text-black'
                        : 'bg-black border border-border text-muted hover:border-border-2 hover:text-mild',
                    ].join(' ')}
                  >
                    {ind === 'all' ? 'All' : INDUSTRY_LABELS[ind]}
                  </button>
                ))}
              </div>
            </div>

            {/* Product filter */}
            <div className="flex items-center gap-2">
              <span className="font-label text-mono-sm uppercase tracking-widest text-muted shrink-0">
                Machine
              </span>
              <div className="flex gap-1.5">
                {products.map((prod) => (
                  <button
                    key={prod}
                    onClick={() => setProductFilter(prod)}
                    className={[
                      'font-label text-mono-sm uppercase tracking-widest px-3 py-1.5 rounded-[2px] transition-all duration-150',
                      productFilter === prod
                        ? 'bg-blue text-black'
                        : 'bg-black border border-border text-muted hover:border-border-2 hover:text-mild',
                    ].join(' ')}
                  >
                    {prod === 'all' ? 'All' : PRODUCT_LABELS[prod]}
                  </button>
                ))}
              </div>
            </div>

            <span className="ml-auto font-label text-mono-sm text-muted">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Card grid */}
      <section className="section-padding bg-black min-h-[60vh]">
        <div className="container-traxon">
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((cs) => (
                  <motion.div
                    key={cs.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="group flex flex-col h-full bg-surface border border-border hover:border-blue/40 transition-colors duration-200"
                    >
                      {/* Image placeholder */}
                      <div
                        className="aspect-[16/9] relative overflow-hidden border-b border-border"
                        style={{ background: 'linear-gradient(135deg, var(--color-surface-2), var(--color-surface-3))' }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-[40px] text-white/5 select-none">{cs.client.slice(0, 1)}</span>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="font-label text-[10px] uppercase tracking-widest bg-blue text-black px-2 py-1">
                            {INDUSTRY_LABELS[cs.industry]}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="font-label text-[10px] uppercase tracking-widest bg-surface border border-border text-muted px-2 py-1">
                            {PRODUCT_LABELS[cs.productSlug]}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6">
                        <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-2">
                          {cs.client} · {cs.country}
                        </p>
                        <h2 className="font-body text-body-lg text-white font-light leading-snug mb-4 group-hover:text-blue transition-colors duration-150">
                          {cs.headline}
                        </h2>

                        {/* Key metric */}
                        {cs.metrics[0] && (
                          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                            <div>
                              <p className="font-display text-[28px] text-blue leading-none">
                                {cs.metrics[0].value}
                              </p>
                              <p className="font-label text-[10px] uppercase tracking-widest text-muted">
                                {cs.metrics[0].label}
                              </p>
                            </div>
                            <span className="font-label text-mono-sm text-muted group-hover:text-blue transition-colors duration-150">
                              Read Case Study →
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center"
              >
                <p className="font-body text-body-lg text-muted font-light">
                  No case studies match the selected filters.
                </p>
                <button
                  onClick={() => { setIndustryFilter('all'); setProductFilter('all') }}
                  className="mt-4 font-label text-mono-sm uppercase tracking-widest text-blue hover:opacity-80 transition-opacity"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </LayoutGroup>
        </div>
      </section>
    </>
  )
}
