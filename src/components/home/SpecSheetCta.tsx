'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'
import gsap from 'gsap'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

const schema = z.object({ email: z.email('Please enter a valid email address.') })
type FormData = z.infer<typeof schema>

export default function SpecSheetCta() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, product: 'scarab-x5' }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus('success')
        if (json.downloadUrl) {
          const a = document.createElement('a')
          a.href = json.downloadUrl
          a.download = 'Traxon-ScarabX5-Spec-Sheet.pdf'
          a.click()
        }
      } else {
        setStatus('error')
        shakeForm()
      }
    } catch {
      setStatus('error')
      shakeForm()
    }
  }

  function shakeForm() {
    if (!formRef.current) return
    gsap.to(formRef.current, {
      keyframes: { x: [0, -6, 6, -4, 4, 0] },
      duration: 0.3,
      ease: 'power2.inOut',
    })
  }

  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.15,
        }}
      />

      <div className="container-traxon relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <div>
            <RevealOnScroll direction="left" className="mb-3">
              <p className="font-label text-mono-label uppercase tracking-[0.2em] text-blue">
                Spec Sheet
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08} className="mb-5">
              <h2 className="font-display text-display-md text-white leading-none">
                Download the Full
                <br />
                Scarab X5 Spec Sheet
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.16}>
              <p className="font-body text-body-lg text-muted font-light leading-relaxed">
                All dimensions, electrical specs, accessories, and
                configurations in one document. No salesperson required.
              </p>
            </RevealOnScroll>
          </div>

          {/* Right — form */}
          <RevealOnScroll delay={0.1}>
            {status === 'success' ? (
              <div className="flex items-center gap-4 bg-[var(--color-blue-dim)] border border-[rgba(0,194,255,0.2)] p-6 rounded-[3px]">
                <span className="text-blue text-2xl" aria-hidden="true">✓</span>
                <div>
                  <p className="font-label text-mono-label uppercase tracking-[0.15em] text-blue mb-1">
                    Download Starting
                  </p>
                  <p className="font-body text-body-sm text-mild">
                    Check your email — we&apos;ve also sent the download link.
                  </p>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col sm:flex-row gap-0">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="your@company.com"
                      disabled={status === 'loading'}
                      className={[
                        'w-full bg-surface-2 text-white font-body text-body-md',
                        'px-4 py-4 sm:rounded-l-[3px]',
                        'placeholder:text-muted',
                        'focus:outline-none transition-colors duration-200',
                        'disabled:opacity-60',
                        errors.email
                          ? 'border border-red-500'
                          : 'border border-border-2 sm:border-r-0 focus:border-blue',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-label="Your email address"
                      aria-invalid={Boolean(errors.email)}
                      {...register('email')}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-blue text-black font-label text-[12px] uppercase tracking-widest px-6 py-4 sm:rounded-r-[3px] hover:opacity-85 transition-opacity duration-200 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'loading' ? 'Sending…' : 'Download PDF'}
                  </button>
                </div>
                {errors.email && (
                  <p className="font-label text-mono-sm text-red-400 mt-2" role="alert">
                    {errors.email.message}
                  </p>
                )}
                {status === 'error' && !errors.email && (
                  <p className="font-label text-mono-sm text-red-400 mt-2" role="alert">
                    Something went wrong. Please try again.
                  </p>
                )}
                <p className="font-label text-mono-sm text-muted mt-3 tracking-[0.1em]">
                  Free download · No credit card · Instant delivery
                </p>
              </form>
            )}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
