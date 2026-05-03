import Link from 'next/link'
import type { CompetitorSpec, ProductSpecs } from '@/types/product'

interface CompareRow {
  label: string
  traxon: string
  competitor: string
  traxonWins: boolean
}

function buildRows(
  specs: ProductSpecs,
  competitor: CompetitorSpec
): CompareRow[] {
  return [
    {
      label: 'Max Payload',
      traxon: `${specs.payload.toLocaleString()} kg`,
      competitor: `${competitor.payload.toLocaleString()} kg`,
      traxonWins: specs.payload > competitor.payload,
    },
    {
      label: 'Battery',
      traxon: `${specs.battery} Ah`,
      competitor: `${competitor.battery} Ah`,
      traxonWins: specs.battery > competitor.battery,
    },
    {
      label: 'Max Gradient',
      traxon: `${specs.gradient}°`,
      competitor: `${competitor.gradient}°`,
      traxonWins: specs.gradient > competitor.gradient,
    },
    {
      label: 'Platform Rotation',
      traxon: 'Standard',
      competitor: competitor.hasRotation ? 'Standard' : 'Optional extra',
      traxonWins: !competitor.hasRotation,
    },
    {
      label: 'Origin',
      traxon: 'USA',
      competitor: 'UK',
      traxonWins: true,
    },
  ]
}

interface CompareStripProps {
  productName: string
  specs: ProductSpecs
  competitor: CompetitorSpec
}

export default function CompareStrip({
  productName,
  specs,
  competitor,
}: CompareStripProps) {
  const rows = buildRows(specs, competitor)

  return (
    <div>
      {/* Header row */}
      <div className="grid grid-cols-3 gap-0 border-b-2 border-border-2 pb-3 mb-0">
        <div className="font-label text-mono-sm uppercase tracking-[0.15em] text-muted" />
        <div className="font-label text-mono-sm uppercase tracking-[0.15em] text-blue text-center">
          {productName}
        </div>
        <div className="font-label text-mono-sm uppercase tracking-[0.15em] text-muted text-center">
          {competitor.name}
        </div>
      </div>

      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-3 gap-0 border-b border-border py-3.5 hover:bg-[var(--color-blue-dim)] transition-colors duration-150 px-0"
        >
          <div className="font-body text-body-sm text-muted self-center">
            {row.label}
          </div>
          <div className="text-center self-center">
            <div className="flex items-center justify-center gap-1.5">
              <span className="font-display text-[18px] text-blue leading-none">
                {row.traxon}
              </span>
              {row.traxonWins && (
                <span className="text-blue text-xs" aria-label="Traxon advantage">
                  ✓
                </span>
              )}
            </div>
          </div>
          <div className="text-center self-center">
            <span className="font-display text-[18px] text-muted leading-none">
              {row.competitor}
            </span>
          </div>
        </div>
      ))}

      <div className="mt-5">
        <Link
          href="/why-traxon"
          className="inline-flex items-center gap-2 font-label text-mono-sm uppercase tracking-[0.2em] text-muted hover:text-blue transition-colors duration-200"
        >
          See full comparison
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  )
}
