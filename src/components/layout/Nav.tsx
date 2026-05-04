'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/why-traxon', label: 'Why Traxon' },
  { href: '/industries', label: 'Industries' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/dealers', label: 'Dealers' },
] as const

export default function Nav() {
  const pathname = usePathname()
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setAtTop(y < 10)

      if (mobileOpen) return

      if (y > lastScrollY.current && y > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileOpen])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        animate={{ y: hidden && !mobileOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
        className={[
          'fixed top-0 left-0 right-0 z-[100]',
          'h-[72px] md:h-[72px]',
          'flex items-center',
          'border-b transition-colors duration-300',
          atTop
            ? 'bg-[rgba(8,10,13,0.85)] border-transparent'
            : 'bg-[rgba(8,10,13,0.97)] border-border',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Main navigation"
      >
        <div className="container-traxon w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
            aria-label="Scarab by Traxon — Home"
          >
            <Image
              src="/website_logo.png"
              alt="Scarab by Traxon"
              width={140}
              height={50}
              priority
              className="h-[50px] w-auto"
            />
          </Link>

          {/* Desktop links */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Desktop navigation"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`)
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    'relative font-label text-mono-label uppercase tracking-widest',
                    'transition-colors duration-200',
                    'pb-1',
                    isActive ? 'text-white' : 'text-muted hover:text-white',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {label}
                  {/* Active blue dot indicator */}
                  {isActive && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0 w-1 h-1 rounded-full bg-blue"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" href="/contact?intent=demo" className="hidden xl:inline-flex">
              Request Demo
            </Button>
            <Button variant="primary" size="sm" href="/contact?intent=quote">
              Get a Quote
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-nav"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-current origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-current"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-current origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] bg-[rgba(8,10,13,0.98)] flex flex-col items-center justify-center"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col items-center gap-2 w-full px-8">
              {NAV_LINKS.map(({ href, label }, i) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`)
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <Link
                      href={href}
                      className={[
                        'block text-center py-4 border-b border-border',
                        'font-label text-mono-label uppercase tracking-[0.25em]',
                        'transition-colors duration-200',
                        isActive ? 'text-blue' : 'text-mild hover:text-white',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: NAV_LINKS.length * 0.06,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className="flex flex-col gap-3 w-full mt-8"
              >
                <Button variant="primary" href="/contact?intent=quote" className="w-full justify-center">
                  Get a Quote
                </Button>
                <Button variant="ghost" href="/contact?intent=demo" className="w-full justify-center">
                  Request Demo
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
