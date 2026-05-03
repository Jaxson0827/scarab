'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import type { ProductSpecs } from '@/types/product'
import { useQuoteBuilder } from '@/hooks/useQuoteBuilder'
import Badge from '@/components/ui/Badge'

interface StickyRailProps {
  productName: string
  slug: string
  tier: 'flagship' | 'mid' | 'entry'
  capacity: string
  specs: ProductSpecs
}

const TIER_LABELS = {
  flagship: 'Flagship',
  mid: 'Mid Series',
  entry: 'Entry Series',
}

const KEY_SPECS = (specs: ProductSpecs) => [
  { label: 'Payload', value: specs.payload.toLocaleString(), unit: 'kg' },
  { label: 'Width', value: String(specs.width), unit: 'mm' },
  { label: 'Gradient', value: String(specs.gradient), unit: '°' },
  { label: 'Battery', value: String(specs.battery), unit: 'Ah' },
  { label: 'Weight', value: String(specs.weight), unit: 'kg' },
  { label: 'Speed', value: String(specs.speed), unit: 'km/h' },
]

function RailContent({
  productName,
  slug,
  tier,
  capacity,
  specs,
  accessories,
}: StickyRailProps & { accessories: string[] }) {
  return (
    <div className="flex flex-col gap-6 p-6 xl:p-8 h-full">
      {/* Tier badge */}
      <Badge variant={tier === 'flagship' ? 'blue' : 'muted'}>
        {TIER_LABELS[tier]}
      </Badge>

      {/* Product name */}
      <div>
        <h1 className="font-display text-[40px] text-white leading-none mb-2">
          {productName.toUpperCase()}
        </h1>
        <p className="font-display text-[20px] text-blue leading-none">{capacity}</p>
      </div>

      {/* 6-key spec summary */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-5 border-y border-border">
        {KEY_SPECS(specs).map(({ label, value, unit }) => (
          <div key={label}>
            <div className="flex items-baseline gap-0.5 leading-none mb-0.5">
              <span className="font-display text-[20px] text-white">{value}</span>
              <span className="font-display text-[13px] text-blue">{unit}</span>
            </div>
            <span className="font-label text-mono-sm uppercase tracking-[0.15em] text-muted">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Quote builder summary */}
      {accessories.length > 0 && (
        <div className="bg-[var(--color-blue-dim)] border border-[rgba(0,194,255,0.15)] p-4">
          <p className="font-label text-mono-sm uppercase tracking-[0.15em] text-blue mb-2">
            {accessories.length} accessor{accessories.length === 1 ? 'y' : 'ies'} in quote
          </p>
          <p className="font-body text-body-sm text-mild font-light">
            Your selections are saved. They&apos;ll be included in your quote request.
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3 mt-auto">
        <Link
          href={`/contact?intent=quote&product=${slug}${accessories.length ? `&accessories=${accessories.join(',')}` : ''}`}
          className="flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest px-6 py-4 rounded-[3px] hover:opacity-85 hover:-translate-y-px transition-all duration-200 text-center"
        >
          Request a Quote
        </Link>
        <Link
          href={`/contact?intent=download&product=${slug}`}
          className="flex items-center justify-center border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-6 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200 text-center"
        >
          Download Spec Sheet
        </Link>
        <Link
          href={`/contact?intent=demo&product=${slug}`}
          className="flex items-center justify-center font-label text-mono-sm uppercase tracking-[0.2em] text-muted hover:text-blue transition-colors duration-200 py-2"
        >
          Book a Demo →
        </Link>
      </div>
    </div>
  )
}

export default function StickyRail(props: StickyRailProps) {
  const { accessories } = useQuoteBuilder(props.slug)
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      {/* Desktop sticky rail */}
      <aside
        className="hidden lg:block w-[320px] xl:w-[340px] shrink-0 border-r border-border"
        aria-label="Product overview and quote options"
      >
        <div
          className="sticky overflow-y-auto"
          style={{ top: '72px', height: 'calc(100vh - 72px)' }}
        >
          <RailContent {...props} accessories={accessories} />
        </div>
      </aside>

      {/* Mobile: floating bottom bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border-2 p-4 flex items-center justify-between gap-3"
        aria-label="Quick quote options"
      >
        <div>
          <p className="font-display text-[18px] text-white leading-none">
            {props.productName.toUpperCase()}
          </p>
          <p className="font-display text-[13px] text-blue leading-none mt-0.5">
            {props.capacity}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSheetOpen(true)}
            className="font-label text-[10px] uppercase tracking-widest border border-border-2 text-muted px-4 py-3 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200 cursor-pointer"
          >
            Specs
          </button>
          <Link
            href={`/contact?intent=quote&product=${props.slug}`}
            className="font-label text-[10px] uppercase tracking-widest bg-blue text-black px-4 py-3 rounded-[3px] hover:opacity-85 transition-opacity duration-200"
          >
            Get Quote
          </Link>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSheetOpen(false)}
              aria-hidden="true"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-surface border-t-2 border-border-2 max-h-[85dvh] overflow-y-auto lg:hidden"
              aria-label="Product details and quote options"
              role="dialog"
              aria-modal="true"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-border-2" aria-hidden="true" />
              </div>
              {/* Close button */}
              <button
                onClick={() => setSheetOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted hover:text-white transition-colors"
                aria-label="Close product details"
              >
                ✕
              </button>

              <RailContent {...props} accessories={accessories} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
