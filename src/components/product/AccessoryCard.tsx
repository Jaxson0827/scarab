'use client'

import type { Accessory } from '@/types/product'

interface AccessoryCardProps {
  accessory: Accessory
  isSelected: boolean
  onToggle: (id: string) => void
}

export default function AccessoryCard({
  accessory,
  isSelected,
  onToggle,
}: AccessoryCardProps) {
  return (
    <div
      className={[
        'relative flex flex-col p-6 border transition-all duration-200',
        isSelected
          ? 'border-blue bg-[var(--color-blue-dim)]'
          : 'border-border bg-surface hover:bg-surface-2 hover:border-border-2',
      ].join(' ')}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 bg-blue flex items-center justify-center"
          aria-hidden="true"
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="var(--color-black)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Accessory image placeholder */}
      <div className="w-full aspect-[4/3] bg-surface-3 border border-border mb-5 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="text-muted"
          aria-hidden="true"
        >
          <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="1"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M4 22L10 16L14 20L20 13L28 22"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {/* Name */}
      <h3 className="font-display text-[18px] text-white leading-tight mb-1">
        {accessory.name}
      </h3>

      {/* Short description */}
      <p className="font-label text-mono-sm uppercase tracking-[0.15em] text-blue mb-3">
        {accessory.shortDescription}
      </p>

      {/* Full description */}
      <p className="font-body text-body-sm text-muted font-light leading-relaxed flex-1 mb-5">
        {accessory.description}
      </p>

      {/* Add / Remove button */}
      <button
        onClick={() => onToggle(accessory.id)}
        className={[
          'w-full py-3 font-label text-[11px] uppercase tracking-widest',
          'border rounded-[3px] transition-all duration-200 cursor-pointer',
          isSelected
            ? 'border-blue text-blue hover:bg-blue hover:text-black'
            : 'border-border-2 text-muted hover:border-blue hover:text-white',
        ].join(' ')}
        aria-pressed={isSelected}
        aria-label={
          isSelected
            ? `Remove ${accessory.name} from quote`
            : `Add ${accessory.name} to quote`
        }
      >
        {isSelected ? '✓ Added to Quote' : 'Add to Quote'}
      </button>
    </div>
  )
}
