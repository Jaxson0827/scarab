import type { ProductSpecs } from '@/types/product'

interface SpecRow {
  key: keyof ProductSpecs
  label: string
  format: (val: number | boolean) => string
  unit?: string
  icon: React.ReactNode
}

const SPEC_ROWS: SpecRow[] = [
  {
    key: 'payload',
    label: 'Maximum Payload',
    format: (v) => (v as number).toLocaleString(),
    unit: 'kg',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L13 7H17L14 11L15.5 16L10 13L4.5 16L6 11L3 7H7L10 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'width',
    label: 'Track Width',
    format: (v) => String(v),
    unit: 'mm',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M2 10H18M2 7V13M18 7V13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'weight',
    label: 'Machine Weight',
    format: (v) => String(v),
    unit: 'kg',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 18C4 14.686 6.686 12 10 12C13.314 12 16 14.686 16 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'battery',
    label: 'Battery Capacity',
    format: (v) => String(v),
    unit: 'Ah',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M16 9H18V12H16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 10.5L9 8.5V10H12L10 12V10.5H7Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: 'speed',
    label: 'Max Travel Speed',
    format: (v) => String(v),
    unit: 'km/h',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 13C3 9.134 6.134 6 10 6C13.866 6 17 9.134 17 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M10 13L13 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="10" cy="13" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: 'height',
    label: 'Deck Height (lowered)',
    format: (v) => String(v),
    unit: 'mm',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3V17M7 5L10 3L13 5M7 15L10 17L13 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'gradient',
    label: 'Max Gradient',
    format: (v) => String(v),
    unit: '°',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 17L17 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M17 3H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M17 3V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M3 17H17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  },
  {
    key: 'hasWirelessRemote',
    label: 'Wireless Remote',
    format: (v) => (v ? 'Full Proportional Display' : 'Optional'),
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M2 6C5.314 2.686 14.686 2.686 18 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        <path d="M4.5 8.5C6.567 6.433 13.433 6.433 15.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <path d="M7 11C8.343 9.657 11.657 9.657 13 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="10" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
]

interface SpecTableProps {
  specs: ProductSpecs
  className?: string
}

export default function SpecTable({ specs, className = '' }: SpecTableProps) {
  return (
    <div className={className}>
      <table className="w-full border-collapse">
        <caption className="sr-only">Full technical specifications</caption>
        <tbody>
          {SPEC_ROWS.map(({ key, label, format, unit, icon }, i) => {
            const val = specs[key]
            const formatted = format(val)
            return (
              <tr
                key={key}
                className={[
                  'flex items-center gap-4 py-4',
                  i > 0 ? 'border-t border-border' : '',
                  'hover:bg-surface-2 transition-colors duration-150 px-4 -mx-4',
                ].join(' ')}
              >
                <td className="shrink-0 text-muted w-5">{icon}</td>
                <td className="flex-1 font-body text-body-sm text-mild">
                  {label}
                </td>
                <td className="text-right">
                  <span className="font-display text-[22px] text-white leading-none">
                    {formatted}
                  </span>
                  {unit && (
                    <span className="font-display text-[14px] text-blue ml-1">
                      {unit}
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
