'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// ─── Types ─────────────────────────────────────────────────────────────────

type UseCase = 'construction' | 'mining' | 'utilities' | 'events' | 'other'

interface Step1Data { useCase: UseCase }
interface Step2Data { payload: number; width: number; gradient: number }
interface Step3Data { product: string; accessories: string[] }

const step4Schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  company: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  message: z.string().optional(),
})

type Step4Data = z.infer<typeof step4Schema>

// ─── Use case options ─────────────────────────────────────────────────────

const USE_CASES: { id: UseCase; label: string; icon: string; description: string }[] = [
  { id: 'construction', label: 'Construction & Civil', icon: '🏗', description: 'Moving precast, steel, and plant through finished structures' },
  { id: 'mining', label: 'Mining & Quarrying', icon: '⛏', description: 'Underground equipment relocation in tunnels and drives' },
  { id: 'utilities', label: 'Utilities & Energy', icon: '⚡', description: 'Transformer and switchgear installation in substations' },
  { id: 'events', label: 'Events & Production', icon: '🎬', description: 'Stage, screen, and production equipment in live venues' },
  { id: 'other', label: 'Other / Custom', icon: '⚙', description: 'Industrial plant relocation, manufacturing, shipbuilding' },
]

const ACCESSORIES = [
  { id: 'extended-remote', label: 'Extended Range Remote (100m)' },
  { id: 'low-profile-deck', label: 'Low-Profile Deck Insert' },
  { id: 'side-guide-rails', label: 'Side Guide Rail Kit' },
  { id: 'hydraulic-ramps', label: 'Hydraulic Loading Ramps' },
  { id: 'rotation-motor', label: 'Platform Rotation Motor (360°)' },
  { id: 'aux-power', label: '48V Auxiliary Power Kit' },
]

// ─── Step slide variants ─────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

const reducedVariants = {
  enter: () => ({ opacity: 0 }),
  center: { opacity: 1 },
  exit: () => ({ opacity: 0 }),
}

const slideTransition = { duration: 0.4, ease: 'easeInOut' as const }
const reducedTransition = { duration: 0.15 }

// ─── Product recommendation logic ────────────────────────────────────────

function getRecommendation(payload: number, width: number): { slug: string; name: string; reason: string } | null {
  if (payload > 4000 || width < 800) return null
  return {
    slug: 'scarab-x5',
    name: 'Scarab X5',
    reason: `The Scarab X5 handles up to 4,000 lbs through a 1,000mm corridor${width < 1000 ? ` — at ${width}mm access width, it fits with clearance to spare` : ''}.`,
  }
}

// ─── Main Component ──────────────────────────────────────────────────────

export default function QuoteWizard() {
  const prefersReducedMotion = useReducedMotion()
  const searchParams = useSearchParams()
  const preselectedIndustry = searchParams.get('industry')
  const preselectedIntent = searchParams.get('intent')

  const initialUseCase = preselectedIndustry
    ? (['construction', 'mining', 'utilities', 'events'].includes(preselectedIndustry)
        ? (preselectedIndustry as UseCase)
        : 'other')
    : undefined

  const [step, setStep] = useState(preselectedIndustry || preselectedIntent === 'demo' ? 0 : 0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [step1Data, setStep1Data] = useState<Step1Data>({ useCase: initialUseCase ?? 'construction' })
  const [step1Selected, setStep1Selected] = useState(!!initialUseCase)
  const [step2Data, setStep2Data] = useState<Step2Data>({ payload: 2000, width: 1100, gradient: 5 })
  const [step3Data, setStep3Data] = useState<Step3Data>({
    product: '',
    accessories: [],
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step4Data>({ resolver: zodResolver(step4Schema) })

  const errorContainerRef = useRef<HTMLDivElement>(null)

  function goNext() {
    setDirection(1)
    setStep((s) => Math.min(s + 1, 3))
  }

  function goPrev() {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  useGSAP(() => {
    if (Object.keys(errors).length > 0 && errorContainerRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return
      gsap.fromTo(
        errorContainerRef.current,
        { x: -10 },
        { x: 0, duration: 0.4, ease: 'elastic.out(1.5, 0.3)', clearProps: 'x' }
      )
    }
  }, [errors])

  async function onStep4Submit(data: Step4Data) {
    const finalProduct = step3Data.product || getRecommendation(step2Data.payload, step2Data.width)?.slug || 'scarab-x5'
    const payload = {
      industry: step1Data.useCase,
      payload: step2Data.payload,
      width: step2Data.width,
      gradient: step2Data.gradient,
      product: finalProduct,
      accessories: step3Data.accessories,
      ...data,
    }

    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error('Submission failed — please try again.')
    }

    setSubmitted(true)
  }

  const recommendation = getRecommendation(step2Data.payload, step2Data.width)
  const TOTAL_STEPS = 4
  const progress = ((step + 1) / TOTAL_STEPS) * 100

  if (submitted) {
    return <SuccessState />
  }

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="h-0.5 bg-border mb-10 overflow-hidden">
        <motion.div
          className="h-full bg-blue"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-label text-mono-sm uppercase tracking-widest text-muted">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={[
                'h-1 rounded-full transition-all duration-300',
                i <= step ? 'bg-blue w-6' : 'bg-border-2 w-3',
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={prefersReducedMotion ? reducedVariants : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={prefersReducedMotion ? reducedTransition : slideTransition}
          >
            {step === 0 && (
              <Step1
                selected={step1Data.useCase}
                onSelect={(uc) => { setStep1Data({ useCase: uc }); setStep1Selected(true) }}
                onNext={goNext}
                hasSelection={step1Selected}
              />
            )}
            {step === 1 && (
              <Step2
                data={step2Data}
                onChange={setStep2Data}
                onNext={goNext}
                onBack={goPrev}
              />
            )}
            {step === 2 && (
              <Step3
                recommendation={recommendation}
                step2={step2Data}
                data={step3Data}
                onChange={setStep3Data}
                onNext={goNext}
                onBack={goPrev}
              />
            )}
            {step === 3 && (
              <div ref={errorContainerRef}>
                <Step4
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onStep4Submit}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onBack={goPrev}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Step 1 — Use Case ───────────────────────────────────────────────────

function Step1({
  selected,
  onSelect,
  onNext,
  hasSelection,
}: {
  selected: UseCase
  onSelect: (uc: UseCase) => void
  onNext: () => void
  hasSelection: boolean
}) {
  return (
    <div>
      <h2 className="font-display text-[36px] lg:text-[44px] text-white leading-none mb-2">
        What&apos;s your use case?
      </h2>
      <p className="font-body text-body-sm text-muted font-light mb-8">
        Select the industry that best describes your application.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {USE_CASES.map((uc) => (
          <button
            key={uc.id}
            onClick={() => onSelect(uc.id)}
            className={[
              'text-left p-5 border transition-all duration-150 rounded-[3px]',
              selected === uc.id
                ? 'border-blue bg-blue-dim'
                : 'border-border bg-surface hover:border-border-2',
            ].join(' ')}
          >
            <span className="text-2xl mb-3 block">{uc.icon}</span>
            <p className={['font-body text-body-sm font-medium mb-1', selected === uc.id ? 'text-white' : 'text-mild'].join(' ')}>
              {uc.label}
            </p>
            <p className="font-body text-[12px] text-muted font-light leading-relaxed">
              {uc.description}
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!hasSelection}
          className="inline-flex items-center justify-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next: Load Requirements →
        </button>
      </div>
    </div>
  )
}

// ─── Step 2 — Load Requirements ──────────────────────────────────────────

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: Step2Data
  onChange: (d: Step2Data) => void
  onNext: () => void
  onBack: () => void
}) {
  const recommendation = getRecommendation(data.payload, data.width)

  return (
    <div>
      <h2 className="font-display text-[36px] lg:text-[44px] text-white leading-none mb-2">
        Load Requirements
      </h2>
      <p className="font-body text-body-sm text-muted font-light mb-8">
        Enter your payload, access width, and maximum gradient.
      </p>

      <div className="space-y-8 mb-8">
        {/* Payload slider */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="font-label text-mono-sm uppercase tracking-widest text-muted">
              Payload Weight
            </label>
            <span className="font-display text-[28px] text-blue leading-none">
              {data.payload.toLocaleString()}
              <span className="text-[16px] text-blue/70 ml-1">lbs</span>
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={6000}
            step={100}
            value={data.payload}
            onChange={(e) => onChange({ ...data, payload: Number(e.target.value) })}
            className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-blue"
          />
          <div className="flex justify-between mt-1">
            <span className="font-label text-[10px] text-muted">100 lbs</span>
            <span className="font-label text-[10px] text-muted">6,000 lbs</span>
          </div>
        </div>

        {/* Width input */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="font-label text-mono-sm uppercase tracking-widest text-muted">
              Access Width (corridor / doorway)
            </label>
            <span className="font-display text-[28px] text-blue leading-none">
              {data.width}
              <span className="text-[16px] text-blue/70 ml-1">mm</span>
            </span>
          </div>
          <input
            type="range"
            min={600}
            max={3000}
            step={50}
            value={data.width}
            onChange={(e) => onChange({ ...data, width: Number(e.target.value) })}
            className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-blue"
          />
          <div className="flex justify-between mt-1">
            <span className="font-label text-[10px] text-muted">600 mm</span>
            <span className="font-label text-[10px] text-muted">3,000 mm</span>
          </div>
        </div>

        {/* Gradient */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="font-label text-mono-sm uppercase tracking-widest text-muted">
              Maximum Gradient
            </label>
            <span className="font-display text-[28px] text-blue leading-none">
              {data.gradient}
              <span className="text-[16px] text-blue/70 ml-1">°</span>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            step={1}
            value={data.gradient}
            onChange={(e) => onChange({ ...data, gradient: Number(e.target.value) })}
            className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-blue"
          />
          <div className="flex justify-between mt-1">
            <span className="font-label text-[10px] text-muted">Flat</span>
            <span className="font-label text-[10px] text-muted">15°</span>
          </div>
        </div>
      </div>

      {/* Live recommendation preview */}
      <div className={[
        'p-4 border mb-8 transition-all duration-200',
        data.payload > 4000 || data.width < 800
          ? 'border-yellow-500/30 bg-yellow-500/5'
          : 'border-blue/30 bg-blue-dim',
      ].join(' ')}>
        {data.payload > 4000 || data.width < 800 ? (
          <p className="font-body text-body-sm text-yellow-400/80 font-light">
            Your requirements need a custom solution — our team will configure it for you.
          </p>
        ) : (
          <p className="font-body text-body-sm text-mild font-light">
            Based on your inputs, we&apos;d recommend the{' '}
            <span className="text-blue font-medium">{recommendation?.name}</span>.
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="font-label text-mono-sm uppercase tracking-widest text-muted hover:text-white transition-colors duration-150">
          ← Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 transition-all duration-200"
        >
          Next: Product Match →
        </button>
      </div>
    </div>
  )
}

// ─── Step 3 — Product Match ──────────────────────────────────────────────

function Step3({
  recommendation,
  step2,
  data,
  onChange,
  onNext,
  onBack,
}: {
  recommendation: ReturnType<typeof getRecommendation>
  step2: Step2Data
  data: Step3Data
  onChange: (d: Step3Data) => void
  onNext: () => void
  onBack: () => void
}) {
  const isOverCapacity = step2.payload > 4000 || step2.width < 800
  const product = data.product || recommendation?.slug || ''

  const PRODUCT_OPTIONS = [
    { slug: 'scarab-x5', name: 'Scarab X5', capacity: '4,000 lbs' },
  ]

  function toggleAccessory(id: string) {
    const acc = data.accessories.includes(id)
      ? data.accessories.filter((a) => a !== id)
      : [...data.accessories, id]
    onChange({ ...data, accessories: acc })
  }

  return (
    <div>
      <h2 className="font-display text-[36px] lg:text-[44px] text-white leading-none mb-2">
        {isOverCapacity ? 'Custom Solution Required' : 'Your Machine Match'}
      </h2>
      <p className="font-body text-body-sm text-muted font-light mb-8">
        {isOverCapacity
          ? 'Your payload exceeds our standard range. Our engineering team will design a solution.'
          : 'Based on your requirements. You can override the recommendation below.'}
      </p>

      {!isOverCapacity && (
        <>
          {/* Recommendation card */}
          {recommendation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-blue bg-blue-dim p-6 mb-6"
            >
              <p className="font-label text-mono-sm uppercase tracking-widest text-blue mb-2">
                Recommended
              </p>
              <p className="font-display text-[40px] text-white leading-none mb-2">
                {recommendation.name}
              </p>
              <p className="font-body text-body-sm text-mild font-light">{recommendation.reason}</p>
            </motion.div>
          )}

          {/* Override options */}
          <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-3">
            Your machine:
          </p>
          <div className="grid grid-cols-1 gap-2 mb-8">
            {PRODUCT_OPTIONS.map((opt) => (
              <button
                key={opt.slug}
                onClick={() => onChange({ ...data, product: opt.slug })}
                className={[
                  'p-4 border text-center transition-all duration-150 rounded-[3px]',
                  (product === opt.slug || (!data.product && recommendation?.slug === opt.slug))
                    ? 'border-blue bg-blue-dim'
                    : 'border-border bg-surface hover:border-border-2',
                ].join(' ')}
              >
                <p className="font-display text-[20px] text-white leading-none mb-1">
                  {opt.name}
                </p>
                <p className="font-display text-[14px] text-blue">{opt.capacity}</p>
              </button>
            ))}
          </div>

          {/* Accessories */}
          <p className="font-label text-mono-sm uppercase tracking-widest text-muted mb-3">
            Add accessories (optional):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
            {ACCESSORIES.map((acc) => (
              <button
                key={acc.id}
                onClick={() => toggleAccessory(acc.id)}
                className={[
                  'flex items-center gap-3 px-4 py-3 border text-left transition-all duration-150 rounded-[3px]',
                  data.accessories.includes(acc.id)
                    ? 'border-blue bg-blue-dim'
                    : 'border-border bg-surface hover:border-border-2',
                ].join(' ')}
              >
                <span
                  className={[
                    'w-4 h-4 rounded-[2px] border flex items-center justify-center shrink-0 transition-colors duration-150',
                    data.accessories.includes(acc.id)
                      ? 'bg-blue border-blue'
                      : 'border-border-2',
                  ].join(' ')}
                >
                  {data.accessories.includes(acc.id) && (
                    <span className="text-black text-[10px] leading-none">✓</span>
                  )}
                </span>
                <span className="font-body text-body-sm text-mild font-light">{acc.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-between">
        <button onClick={onBack} className="font-label text-mono-sm uppercase tracking-widest text-muted hover:text-white transition-colors duration-150">
          ← Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 transition-all duration-200"
        >
          Next: Contact Info →
        </button>
      </div>
    </div>
  )
}

// ─── Step 4 — Contact Info ────────────────────────────────────────────────

function Step4({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  onBack,
}: {
  register: ReturnType<typeof useForm<Step4Data>>['register']
  handleSubmit: ReturnType<typeof useForm<Step4Data>>['handleSubmit']
  onSubmit: (data: Step4Data) => Promise<void>
  errors: ReturnType<typeof useForm<Step4Data>>['formState']['errors']
  isSubmitting: boolean
  onBack: () => void
}) {
  return (
    <div>
      <h2 className="font-display text-[36px] lg:text-[44px] text-white leading-none mb-2">
        Almost There
      </h2>
      <p className="font-body text-body-sm text-muted font-light mb-8">
        Tell us who to send the quote to and we&apos;ll respond within 4 business hours.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="First Name"
            error={errors.firstName?.message}
            required
          >
            <input
              {...register('firstName')}
              className={inputCls(!!errors.firstName)}
              placeholder="Alex"
            />
          </FormField>
          <FormField
            label="Last Name"
            error={errors.lastName?.message}
            required
          >
            <input
              {...register('lastName')}
              className={inputCls(!!errors.lastName)}
              placeholder="Smith"
            />
          </FormField>
        </div>

        <FormField label="Company" error={errors.company?.message} required>
          <input
            {...register('company')}
            className={inputCls(!!errors.company)}
            placeholder="Acme Industrial Ltd"
          />
        </FormField>

        <FormField label="Email Address" error={errors.email?.message} required>
          <input
            type="email"
            {...register('email')}
            className={inputCls(!!errors.email)}
            placeholder="alex@acmeindustrial.com"
          />
        </FormField>

        <FormField label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            {...register('phone')}
            className={inputCls(false)}
            placeholder="+1 (555) 000-0000 (optional)"
          />
        </FormField>

        <FormField label="Message" error={errors.message?.message}>
          <textarea
            {...register('message')}
            rows={4}
            className={`${inputCls(false)} resize-none`}
            placeholder="Any additional details about your project…"
          />
        </FormField>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={onBack}
            className="font-label text-mono-sm uppercase tracking-widest text-muted hover:text-white transition-colors duration-150"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending…
              </>
            ) : (
              'Send Quote Request'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Success State ────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
        className="w-20 h-20 rounded-full bg-blue/10 border-2 border-blue flex items-center justify-center mx-auto mb-8"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-blue text-3xl"
        >
          ✓
        </motion.span>
      </motion.div>

      <h2 className="font-display text-[48px] lg:text-[56px] text-white leading-none mb-4">
        Quote Request Sent
      </h2>
      <p className="font-body text-body-lg text-muted font-light max-w-[440px] mx-auto mb-8 leading-relaxed">
        We&apos;ll be in touch within 4 business hours with a detailed quote and any follow-up questions.
      </p>

      <a
        href="/products/scarab-x5"
        className="inline-flex items-center justify-center border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200"
      >
        View Scarab X5 Specs While You Wait
      </a>
    </motion.div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function inputCls(hasError: boolean) {
  return [
    'w-full bg-surface border px-4 py-3 font-body text-body-sm text-text placeholder:text-muted focus:outline-none transition-colors duration-150',
    hasError ? 'border-red-500/60 focus:border-red-500' : 'border-border focus:border-blue',
  ].join(' ')
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block font-label text-mono-sm uppercase tracking-widest text-muted mb-2">
        {label}{required && <span className="text-blue ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-body text-[12px] text-red-400 mt-1.5">{error}</p>
      )}
    </div>
  )
}
