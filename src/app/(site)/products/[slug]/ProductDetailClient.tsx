'use client'

import { useState } from 'react'
import type { Product } from '@/types/product'
import ModelViewer from '@/components/product/ModelViewer'
import Badge from '@/components/ui/Badge'

const TIER_LABELS = {
  flagship: 'FLAGSHIP',
  mid: 'MID SERIES',
  entry: 'ENTRY SERIES',
} as const

const TIER_BADGE_VARIANT = {
  flagship: 'blue',
  mid: 'outline',
  entry: 'muted',
} as const

interface Props {
  product: Product
}

export default function ProductDetailClient({ product }: Props) {
  const [activeColor, setActiveColor] = useState(0)

  const trackColors = [
    { name: 'Industrial Black', hex: '#1a1a1a' },
    { name: 'Safety Yellow', hex: '#f5c518' },
    { name: 'Hazard Orange', hex: '#ff6b00' },
  ]

  return (
    <section id="overview">
      {/* Product name banner */}
      <div className="mb-8">
        <Badge
          variant={TIER_BADGE_VARIANT[product.tier]}
          className="mb-4"
        >
          {TIER_LABELS[product.tier]}
        </Badge>
        <h1 className="font-display text-[64px] lg:text-[80px] text-white leading-none mb-2">
          {product.name.toUpperCase()}
        </h1>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-display text-[32px] text-blue leading-none">
            {product.specs.payload.toLocaleString()}
          </span>
          <span className="font-display text-[18px] text-blue/70 leading-none">lbs payload</span>
          <span className="font-display text-[18px] text-muted leading-none mx-2">·</span>
          <span className="font-display text-[24px] text-mild leading-none">
            {product.specs.width}
          </span>
          <span className="font-display text-[14px] text-muted leading-none">mm wide</span>
        </div>
        <p className="font-body text-body-lg text-mild font-light max-w-[520px] leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Model viewer / image carousel */}
      <ModelViewer
        modelUrl={product.model3dUrl}
        images={product.images}
        productName={product.name}
        tier={product.tier}
        selectedColor={activeColor === 0 ? 'black' : 'grey'}
      />

      {/* Track color selector */}
      <div className="mt-6">
        <p className="font-label text-mono-sm uppercase tracking-[0.15em] text-muted mb-3">
          Track Color
        </p>
        <div className="flex gap-3">
          {trackColors.map((color, i) => (
            <button
              key={color.name}
              onClick={() => setActiveColor(i)}
              title={color.name}
              className={[
                'w-8 h-8 rounded-full border-2 transition-all duration-150',
                activeColor === i
                  ? 'border-blue scale-110'
                  : 'border-border-2 hover:border-mild',
              ].join(' ')}
              style={{ background: color.hex }}
              aria-pressed={activeColor === i}
              aria-label={`Track color: ${color.name}`}
            />
          ))}
          <span className="font-body text-body-sm text-muted self-center ml-1">
            {trackColors[activeColor]?.name}
          </span>
        </div>
      </div>
    </section>
  )
}
