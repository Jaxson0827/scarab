'use client'

import { useState } from 'react'

export default function FooterNewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="font-label text-mono-sm text-blue tracking-[0.1em]">
        ✓ You&apos;re subscribed.
      </p>
    )
  }

  return (
    <form className="flex gap-0" onSubmit={handleSubmit} aria-label="Newsletter signup">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        disabled={status === 'loading'}
        className={[
          'flex-1 min-w-0',
          'bg-surface-2 border border-border border-r-0',
          'rounded-l-[3px]',
          'font-body text-body-sm text-white',
          'px-3 py-2.5',
          'placeholder:text-muted',
          'focus:outline-none focus:border-blue',
          'transition-colors duration-200',
          'disabled:opacity-60',
        ].join(' ')}
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={[
          'bg-blue text-black',
          'font-label text-[10px] uppercase tracking-widest',
          'px-3 py-2.5',
          'rounded-r-[3px]',
          'hover:opacity-85 transition-opacity duration-200',
          'whitespace-nowrap',
          'cursor-pointer',
          'disabled:opacity-60 disabled:cursor-not-allowed',
        ].join(' ')}
      >
        {status === 'loading' ? '…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="sr-only" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
