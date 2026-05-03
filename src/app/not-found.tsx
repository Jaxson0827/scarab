import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.12,
        }}
      />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,194,255,0.04), transparent)',
        }}
      />

      <div className="relative z-[1] text-center max-w-lg">
        <p className="font-label text-mono-label uppercase tracking-[0.25em] text-blue mb-4">
          Error 404
        </p>

        <h1 className="font-display text-[72px] lg:text-[96px] text-white leading-none mb-6">
          Page Not Found.
        </h1>

        <p className="font-body text-body-base text-mild font-light mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-blue text-black font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:opacity-85 transition-opacity duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center border border-border-2 text-mild font-label text-[12px] uppercase tracking-widest px-8 py-4 rounded-[3px] hover:border-blue hover:text-white transition-all duration-200"
          >
            View Products
          </Link>
        </div>
      </div>

      {/* Large decorative 404 */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 font-display text-[200px] lg:text-[300px] text-white/[0.02] leading-none select-none pointer-events-none whitespace-nowrap"
      >
        404
      </div>
    </div>
  )
}
