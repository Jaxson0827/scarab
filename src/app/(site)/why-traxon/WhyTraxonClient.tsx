'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

// ─── Comparison data ──────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  {
    spec: 'Max Payload',
    traxon: '4,000 lbs',
    aconda: '4,000 kg',
    movex: '3,500 kg',
    traxonWins: true,
    unit: '',
    detail:
      'The Scarab X5 is the only machine in the class to achieve 4,000 lbs payload through a standard 1-metre access — 50% more than the nearest competitor. Built on a fully-welded high-tensile steel chassis rated to 9,000 lbs static load.',
  },
  {
    spec: 'Machine Width',
    traxon: '980 mm',
    aconda: '1,150 mm',
    movex: '1,080 mm',
    traxonWins: true,
    unit: '',
    detail:
      'Every millimetre matters in access-constrained moves. At 980mm, the Scarab X5 clears a standard 1-metre doorway with 10mm on each side. Competitors at 1,080–1,150mm cannot enter without door modification.',
  },
  {
    spec: 'Platform Height (loaded)',
    traxon: '160 mm',
    aconda: '215 mm',
    movex: '195 mm',
    traxonWins: true,
    unit: '',
    detail:
      'Lower platform height means more clearance above the load in low-ceiling environments. The 160mm loaded deck height is 25% lower than the Aconda equivalent and enables use in basement plant rooms, tunnel access ways, and vessel hulls.',
  },
  {
    spec: 'Max Gradient',
    traxon: '10°',
    aconda: '7°',
    movex: '8°',
    traxonWins: true,
    unit: '',
    detail:
      'Ramp and threshold crossing is a primary challenge in industrial facilities. The Scarab X5 handles 10° (17.6%) gradients at full payload — covering loading dock ramps, underground access ramps, and uneven construction site terrain.',
  },
  {
    spec: 'Battery Capacity',
    traxon: '280 Ah',
    aconda: '160 Ah',
    movex: '200 Ah',
    traxonWins: true,
    unit: '',
    detail:
      '280Ah Li-Ion gives the Scarab X5 an 8+ hour continuous operation window at full load. Competitors typically run for 4–5 hours before requiring a recharge. On multi-shift moves, this eliminates the mid-shift recharge delay.',
  },
  {
    spec: 'Wireless Remote Range',
    traxon: '100 m',
    aconda: '30 m',
    movex: '50 m',
    traxonWins: true,
    unit: '',
    detail:
      'The 100m extended range wireless remote allows the operator to control the move from the optimal vantage point — critical for long-run corridor moves in manufacturing facilities and industrial buildings.',
  },
  {
    spec: 'Platform Rotation',
    traxon: '360° motorised',
    aconda: 'None',
    movex: 'Manual (90°)',
    traxonWins: true,
    unit: '',
    detail:
      'Motorised 360° platform rotation is standard on the Scarab X5. This eliminates secondary jacking and turning operations — a 45-minute step in a conventional move becomes an instant remote-controlled action.',
  },
  {
    spec: 'Track System',
    traxon: 'Rubber, multi-pad',
    aconda: 'Steel chain',
    movex: 'Rubber, single-pad',
    traxonWins: true,
    unit: '',
    detail:
      "The Scarab X5's multi-pad rubber track system distributes load across a larger contact area, reducing ground pressure and protecting finished floors. Steel chain tracks (Aconda) are unsuitable for polished concrete or epoxy floors and can leave permanent marking.",
  },
  {
    spec: 'Ground Pressure (full load)',
    traxon: '0.28 lbs/cm²',
    aconda: '0.61 kg/cm²',
    movex: '0.44 kg/cm²',
    traxonWins: true,
    unit: '',
    detail:
      'At 0.28 lbs/cm² at full 4,000 lbs load, the Scarab X5 exerts less ground pressure than a standing adult on most surfaces. This enables use on raised access floors, timber substrates, and cable-protected surfaces where competitors would cause damage.',
  },
  {
    spec: 'Aux Power Output',
    traxon: '48V / 20A',
    aconda: 'None',
    movex: 'None',
    traxonWins: true,
    unit: '',
    detail:
      'Standard 48V auxiliary power output allows connection of powered attachments, hoists, and tooling directly from the machine battery. Eliminates the need for separate power supplies on multi-tool moves.',
  },
  {
    spec: 'IP Rating',
    traxon: 'IP54',
    aconda: 'IP44',
    movex: 'IP44',
    traxonWins: true,
    unit: '',
    detail:
      'IP54 rating means the Scarab X5 is protected against dust ingress and water splashing from all directions — enabling use in construction sites, tunnel environments, and outdoor industrial facilities where competitors are limited to indoor dry conditions.',
  },
  {
    spec: 'Warranty',
    traxon: '3 years',
    aconda: '2 years',
    movex: '1 year',
    traxonWins: true,
    unit: '',
    detail:
      'Every Scarab X5 comes with a 3-year / 2,000-hour comprehensive warranty covering all drive components, battery, and structural elements. Competitive machines typically provide 1–2 year warranties with extensive exclusions on battery degradation.',
  },
]

// ─── Engineering hotspots ─────────────────────────────────────────────────

const HOTSPOTS = [
  {
    id: 'battery',
    label: 'Battery Pack',
    x: 72,
    y: 55,
    detail: '280Ah Li-Ion — engineered for 8+ hour continuous operation at full load. Modular cell design enables in-field replacement without specialist tooling.',
  },
  {
    id: 'tracks',
    label: 'Track System',
    x: 20,
    y: 75,
    detail: 'Multi-pad rubber track with 380mm contact length. Ground pressure at full 4,000 lbs load: 0.28 lbs/cm² — lower than a standing adult. Safe on polished concrete, epoxy, and steel plate.',
  },
  {
    id: 'remote',
    label: 'Remote Receiver',
    x: 45,
    y: 20,
    detail: '100m FHSS wireless remote receiver with dual-redundant antenna. Proportional speed control from full stop to max speed. Emergency stop on signal loss within 100ms.',
  },
  {
    id: 'gradient',
    label: 'Gradient Sensor',
    x: 60,
    y: 65,
    detail: 'Integrated 3-axis IMU continuously monitors machine tilt. Automatic load-equalisation across both tracks on slopes. Hard-stop at 11° prevents uncontrolled movement.',
  },
  {
    id: 'rotation',
    label: 'Platform Rotation Motor',
    x: 35,
    y: 45,
    detail: '360° worm-drive rotation motor with holding brake. 1.2 rpm rotation speed at full load. Remote-controlled — eliminating secondary jacking for load orientation.',
  },
  {
    id: 'aux',
    label: 'Aux Power Output',
    x: 82,
    y: 35,
    detail: '48V / 20A auxiliary output connector. Powers external hoists, powered attachments, and tooling directly from the Scarab X5 battery — no separate power supply required.',
  },
]

// ─── Certifications ───────────────────────────────────────────────────────

const CERTS = [
  { name: 'CE Mark', body: 'European Conformity', detail: 'Certified to Machinery Directive 2006/42/EC and EMC Directive 2014/30/EU' },
  { name: 'ISO 9001', body: 'Quality Management', detail: 'Quality management system certified to ISO 9001:2015 — entire manufacturing process audited annually' },
  { name: 'ANSI/ASME', body: 'B56.6 Standard', detail: 'Conforms to ANSI/ASME B56.6 Safety Standard for Rough Terrain Forklift Trucks' },
  { name: 'IP54', body: 'Ingress Protection', detail: 'All electronics rated IP54 — dust-protected and splash-proof from all directions per IEC 60529' },
]

// ─── Page ─────────────────────────────────────────────────────────────────

export default function WhyTraxonClient() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 bg-black relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.15,
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 80%, rgba(0,194,255,0.07), transparent)' }}
        />
        <div className="container-traxon relative z-[1] text-center">
          <RevealOnScroll direction="up" className="mb-3">
            <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
              Competitive Advantage
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08} className="mb-6">
            <h1 className="font-display text-[72px] lg:text-[96px] text-white leading-none">
              Every Spec.
              <br />
              <span className="text-blue">Every Advantage.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.16}>
            <p className="font-body text-body-lg text-muted font-light max-w-[540px] mx-auto leading-relaxed">
              The Scarab X5 doesn&apos;t win on one number. It wins on every number that matters in industrial plant relocation.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Full Comparison Table ── */}
      <section className="section-padding bg-black">
        <div className="container-traxon">
          <RevealOnScroll className="mb-12">
            <h2 className="font-display text-[40px] lg:text-[52px] text-white leading-none">
              Scarab X5 vs The Field
            </h2>
          </RevealOnScroll>

          {/* Header row */}
          <div className="grid grid-cols-[1fr_repeat(3,_140px)] lg:grid-cols-[1fr_repeat(3,_180px)] gap-px bg-border mb-px">
            <div className="bg-black px-4 py-3" />
            <div className="bg-surface px-4 py-3 text-center border-t-2 border-blue">
              <p className="font-label text-mono-sm uppercase tracking-widest text-blue mb-0.5">Traxon</p>
              <p className="font-display text-[18px] text-white">Scarab X5</p>
            </div>
            <div className="bg-surface px-4 py-3 text-center">
              <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-0.5">Competitor</p>
              <p className="font-display text-[18px] text-mild">Aconda 4000</p>
            </div>
            <div className="bg-surface px-4 py-3 text-center">
              <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-0.5">Competitor</p>
              <p className="font-display text-[18px] text-mild">Movex E-Scout</p>
            </div>
          </div>

          {/* Data rows */}
          <div className="border border-border">
            {COMPARISON_ROWS.map((row, i) => (
              <div key={row.spec}>
                <RevealOnScroll delay={i * 0.03}>
                  <button
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                    className="w-full grid grid-cols-[1fr_repeat(3,_140px)] lg:grid-cols-[1fr_repeat(3,_180px)] gap-px bg-border hover:bg-border-2 transition-colors duration-150"
                    aria-expanded={expandedRow === i}
                  >
                    <div className="bg-surface px-4 lg:px-6 py-4 text-left flex items-center gap-3">
                      <span className="font-body text-body-sm text-mild font-light">{row.spec}</span>
                      <span className="font-label text-[10px] text-muted/60 uppercase tracking-widest hidden lg:inline">
                        {expandedRow === i ? '▲ hide' : '▼ detail'}
                      </span>
                    </div>
                    <div className="bg-surface px-4 py-4 flex items-center justify-center">
                      <span className="font-display text-[17px] lg:text-[19px] text-blue">{row.traxon}</span>
                    </div>
                    <div className="bg-surface px-4 py-4 flex items-center justify-center">
                      <span className="font-body text-body-sm text-muted font-light">{row.aconda}</span>
                    </div>
                    <div className="bg-surface px-4 py-4 flex items-center justify-center">
                      <span className="font-body text-body-sm text-muted font-light">{row.movex}</span>
                    </div>
                  </button>
                </RevealOnScroll>

                <AnimatePresence>
                  {expandedRow === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="bg-surface-2 border-t border-border px-6 lg:px-8 py-5">
                        <p className="font-label text-mono-sm uppercase tracking-widest text-blue mb-2">
                          Why We Win — {row.spec}
                        </p>
                        <p className="font-body text-body-sm text-mild font-light leading-relaxed max-w-[640px]">
                          {row.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineering Explainer ── */}
      <section className="section-padding bg-surface border-t border-border">
        <div className="container-traxon">
          <RevealOnScroll className="mb-4">
            <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
              Engineering
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.06} className="mb-12">
            <h2 className="font-display text-[40px] lg:text-[52px] text-white leading-none">
              Built from First Principles
            </h2>
          </RevealOnScroll>

          <div className="relative">
            {/* Machine diagram placeholder */}
            <div
              className="relative w-full aspect-[2/1] bg-surface-2 border border-border rounded-[3px] overflow-hidden"
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Stylized machine silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[70%] h-[50%]">
                  {/* Machine body */}
                  <div className="absolute inset-0 bg-surface-3 border border-border-2 rounded-[4px]" />
                  <div className="absolute top-0 left-[10%] right-[10%] h-[35%] bg-surface border border-border rounded-[3px] -translate-y-[60%]" />
                  {/* Tracks */}
                  <div className="absolute bottom-0 left-[5%] right-[5%] h-[30%] translate-y-[50%] flex gap-[10%]">
                    <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[20px]" />
                    <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[20px]" />
                  </div>
                  {/* Traxon label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[28px] lg:text-[36px] text-white/10 select-none">
                      SCARAB X5
                    </span>
                  </div>
                </div>
              </div>

              {/* Hotspot pins */}
              {HOTSPOTS.map((hs) => (
                <button
                  key={hs.id}
                  className="absolute group"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => setActiveHotspot(hs.id)}
                  onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                  aria-label={hs.label}
                >
                  <span
                    className={[
                      'flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200',
                      activeHotspot === hs.id
                        ? 'bg-blue border-blue scale-125'
                        : 'bg-surface border-blue/60 group-hover:border-blue group-hover:scale-110',
                    ].join(' ')}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                  </span>
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full border border-blue/30 animate-ping" aria-hidden="true" />
                </button>
              ))}

              {/* Active hotspot card */}
              <AnimatePresence>
                {activeHotspot && (() => {
                  const hs = HOTSPOTS.find((h) => h.id === activeHotspot)!
                  const leftHalf = hs.x > 50
                  return (
                    <motion.div
                      key={activeHotspot}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.15 }}
                      className={[
                        'absolute top-4 z-10 w-[220px] lg:w-[280px] bg-surface border border-blue/30 p-4 pointer-events-none',
                        leftHalf ? 'right-4' : 'left-4',
                      ].join(' ')}
                    >
                      <p className="font-label text-mono-sm uppercase tracking-widest text-blue mb-2">
                        {hs.label}
                      </p>
                      <p className="font-body text-body-sm text-mild font-light leading-relaxed">
                        {hs.detail}
                      </p>
                    </motion.div>
                  )
                })()}
              </AnimatePresence>
            </div>

            {/* Hotspot legend */}
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {HOTSPOTS.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                  className={[
                    'text-left p-3 border rounded-[3px] transition-all duration-150',
                    activeHotspot === hs.id
                      ? 'border-blue bg-blue-dim'
                      : 'border-border hover:border-border-2 bg-surface',
                  ].join(' ')}
                >
                  <span className={['font-label text-mono-sm uppercase tracking-widest', activeHotspot === hs.id ? 'text-blue' : 'text-muted'].join(' ')}>
                    {hs.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Manufacturing & Quality ── */}
      <section className="section-padding bg-black border-t border-border">
        <div className="container-traxon">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <RevealOnScroll className="mb-4">
                <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
                  Manufacturing
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06} className="mb-6">
                <h2 className="font-display text-[36px] lg:text-[48px] text-white leading-none">
                  Built to Last.
                  <br />
                  Built in America.
                </h2>
              </RevealOnScroll>

              <div className="space-y-5">
                {[
                  {
                    title: 'A572 Grade 50 High-Tensile Steel',
                    body: 'Main chassis fabricated from ASTM A572 Grade 50 structural steel — 50,000 psi yield strength. Fully-welded construction, no bolted subframes that can fatigue under cyclic loading.',
                  },
                  {
                    title: '100% Load Testing',
                    body: 'Every Scarab X5 is load-tested to 110% of rated capacity before leaving the factory. Each test is documented with load cell data and video, provided with the machine.',
                  },
                  {
                    title: 'MIL-SPEC Powder Coat',
                    body: 'Two-stage shot blast to Sa 2.5, then MIL-SPEC epoxy primer and polyurethane topcoat. Corrosion-tested to 500+ hours salt spray per ASTM B117.',
                  },
                  {
                    title: 'In-Field Serviceability',
                    body: 'All wear items — tracks, drive motors, battery cells — replaceable in the field without specialist tooling. Mean time to repair under 4 hours for any common failure mode.',
                  },
                ].map((item) => (
                  <RevealOnScroll key={item.title} direction="left">
                    <div className="border-l-2 border-blue/30 pl-4">
                      <p className="font-body text-body-sm text-white font-medium mb-1">{item.title}</p>
                      <p className="font-body text-body-sm text-muted font-light leading-relaxed">{item.body}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Photo grid placeholder */}
            <div className="grid grid-cols-2 gap-2">
              {['Factory Floor', 'QC Testing', 'Machine in Field', 'Load Testing'].map((label, i) => (
                <RevealOnScroll key={label} delay={i * 0.08}>
                  <div
                    className={[
                      'aspect-square bg-surface-2 border border-border flex items-end p-3',
                      i === 0 ? 'col-span-2 aspect-[2/1]' : '',
                    ].join(' ')}
                  >
                    <span className="font-label text-mono-sm uppercase tracking-widest text-muted/50">
                      {label}
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="section-padding bg-surface border-t border-border">
        <div className="container-traxon">
          <RevealOnScroll className="mb-12 text-center">
            <h2 className="font-display text-[36px] lg:text-[48px] text-white leading-none mb-3">
              Certified. Proven. Compliant.
            </h2>
            <p className="font-body text-body-lg text-muted font-light max-w-[480px] mx-auto">
              The Scarab X5 meets or exceeds the certifications required for operation in regulated industrial environments.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTS.map((cert, i) => (
              <RevealOnScroll key={cert.name} delay={i * 0.08}>
                <div className="bg-black border border-border p-6 text-center hover:border-blue/40 transition-colors duration-200 group">
                  <div className="w-12 h-12 rounded-full border-2 border-blue/30 group-hover:border-blue flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                    <span className="font-display text-[10px] text-blue">{cert.name.slice(0, 2)}</span>
                  </div>
                  <p className="font-display text-[20px] text-white mb-1">{cert.name}</p>
                  <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-3">{cert.body}</p>
                  <p className="font-body text-[12px] text-muted/70 font-light leading-relaxed">{cert.detail}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section-padding bg-black border-t border-border">
        <div className="container-traxon text-center">
          <RevealOnScroll className="mb-6">
            <h2 className="font-display text-[48px] lg:text-[64px] text-white leading-none">
              Convinced?
              <br />
              <span className="text-blue">Let&apos;s Talk Numbers.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?intent=quote"
                className="inline-flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 transition-all duration-200"
              >
                Request a Quote
              </Link>
              <Link
                href="/products/scarab-x5"
                className="inline-flex items-center justify-center border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200"
              >
                View Scarab X5 Specs
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
