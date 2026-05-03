'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

gsap.registerPlugin(ScrollTrigger)

const COMPARISON_ROWS = [
  { spec: 'Maximum Payload', traxon: '4,000 LBS', aconda: '4,000 KG', traxonWins: true },
  { spec: 'Max Gradient', traxon: '45°', aconda: '45°', traxonWins: false },
  { spec: 'Battery Capacity', traxon: '280 Ah', aconda: '200 Ah', traxonWins: true },
  { spec: 'Platform Rotation', traxon: 'Standard', aconda: 'Optional', traxonWins: true },
  { spec: 'Gradient Monitoring', traxon: 'Real-Time', aconda: 'Basic', traxonWins: true },
  { spec: 'Remote Feedback', traxon: 'Full Display', aconda: 'Limited', traxonWins: true },
  { spec: 'Aux Power Output', traxon: '48V / 24V', aconda: '24V Only', traxonWins: true },
  { spec: 'Origin', traxon: 'USA', aconda: 'UK', traxonWins: true },
]

const WHY_DETAILS: Record<number, string> = {
  0: 'The Scarab X5 delivers 50% more payload than the Aconda 4000 PRO in the same 1,000mm track width — an engineering achievement that redefines what is possible in confined-space heavy transport.',
  2: '280Ah vs 200Ah means the Scarab X5 runs a full 8-hour shift without recharge. No mid-shift downtime, no swapping battery packs on site.',
  3: 'Platform rotation comes standard on every Scarab X5. The Aconda requires an optional upgrade add-on — at additional cost and lead time.',
  4: 'Real-time gradient monitoring alerts the operator when the machine is approaching its rated slope. The Aconda offers only a basic tilt indicator.',
  5: 'The Scarab X5 remote provides load feedback, battery percentage, speed, and gradient on a full display. Aconda\'s remote gives limited status information.',
  6: 'Dual 48V and 24V auxiliary outputs mean you can power external tools from the machine. The Aconda is 24V only.',
}

const FEATURES = [
  {
    num: '01',
    title: '50% More Payload, Same Footprint',
    body: 'The Scarab X5 moves 4,000 lbs through a 1-meter doorway. That\'s not an incremental improvement — it\'s a different class of machine.',
  },
  {
    num: '02',
    title: 'Smarter Control System',
    body: 'Full-display proportional remote with real-time gradient monitoring, load feedback, and battery telemetry.',
  },
  {
    num: '03',
    title: '40% More Battery Runtime',
    body: '280Ah vs the competitor\'s 200Ah. The Scarab X5 outlasts a full shift without a recharge.',
  },
  {
    num: '04',
    title: 'American-Engineered, American-Supported',
    body: 'Designed and built in the USA. Parts available next-day. Support team that picks up the phone.',
  },
]

export default function ComparisonSection() {
  const tableRef = useRef<HTMLTableElement>(null)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      const rows = tableRef.current?.querySelectorAll('tbody tr')
      if (!rows || prefersReducedMotion) return

      gsap.set(rows, { opacity: 0, x: -20 })

      ScrollTrigger.create({
        trigger: tableRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.04,
          })
        },
      })
    },
    { scope: tableRef }
  )

  return (
    <section className="section-padding bg-black">
      <div className="container-traxon">
        {/* Header */}
        <RevealOnScroll direction="left" className="mb-3">
          <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
            Why Traxon
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.08} className="mb-14">
          <h2 className="font-display text-display-lg text-white leading-none">
            Every Spec.
            <br />
            Every Advantage.
          </h2>
        </RevealOnScroll>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16">
          {/* Left — Comparison Table */}
          <div>
            <div className="overflow-x-auto">
              <table ref={tableRef} className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border-2">
                    <th className="text-left py-4 pr-6 font-label text-mono-sm uppercase tracking-[0.2em] text-muted w-[40%]">
                      Specification
                    </th>
                    <th className="text-left py-4 px-4 font-label text-mono-sm uppercase tracking-[0.15em] text-blue">
                      Traxon Scarab X5
                    </th>
                    <th className="text-left py-4 pl-4 font-label text-mono-sm uppercase tracking-[0.15em] text-muted">
                      Aconda 4000 Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <>
                      <tr
                        key={row.spec}
                        onClick={() => {
                          if (WHY_DETAILS[i]) {
                            setExpandedRow(expandedRow === i ? null : i)
                          }
                        }}
                        className={[
                          'border-b border-border',
                          'transition-colors duration-150',
                          'hover:bg-[var(--color-blue-dim)]',
                          WHY_DETAILS[i] ? 'cursor-pointer' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <td className="py-3.5 pr-6">
                          <div className="flex items-center gap-2">
                            <span className="font-body text-body-sm text-mild">
                              {row.spec}
                            </span>
                            {WHY_DETAILS[i] && (
                              <span className="font-label text-[8px] uppercase tracking-[0.15em] text-blue opacity-60">
                                {expandedRow === i ? '▲ why' : '▼ why'}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-display text-[18px] text-blue leading-none">
                              {row.traxon}
                            </span>
                            {row.traxonWins && (
                              <span className="text-blue text-sm" aria-label="Traxon wins">
                                ✓
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 pl-4">
                          <span className="font-display text-[18px] text-muted leading-none">
                            {row.aconda}
                          </span>
                        </td>
                      </tr>

                      {/* Expandable detail row */}
                      <AnimatePresence>
                        {expandedRow === i && WHY_DETAILS[i] && (
                          <motion.tr
                            key={`detail-${i}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td
                              colSpan={3}
                              className="pb-4 pt-1 px-0"
                            >
                              <div className="bg-[var(--color-blue-dim)] border-l-2 border-blue px-4 py-3 rounded-r-sm">
                                <p className="font-label text-mono-sm uppercase tracking-[0.15em] text-blue mb-1.5">
                                  Why We Win
                                </p>
                                <p className="font-body text-body-sm text-mild font-light leading-relaxed">
                                  {WHY_DETAILS[i]}
                                </p>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right — Feature list */}
          <div className="flex flex-col">
            {FEATURES.map(({ num, title, body }, i) => (
              <RevealOnScroll key={num} delay={i * 0.08}>
                <div className={['flex gap-5 py-7', i > 0 ? 'border-t border-border' : ''].join(' ')}>
                  <span
                    className="font-display text-[56px] leading-none shrink-0 select-none"
                    style={{ color: 'var(--color-border-2)' }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-[20px] text-white mb-2 leading-tight">
                      {title}
                    </h3>
                    <p className="font-body text-body-sm text-muted font-light leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
