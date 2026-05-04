import Image from 'next/image'
import Link from 'next/link'
import FooterNewsletterForm from './FooterNewsletterForm'

const PRODUCTS = [
  { href: '/products/scarab-x5', label: 'Scarab X5 — 4,000 lbs' },
]

const COMPANY = [
  { href: '/why-traxon', label: 'Why Traxon' },
  { href: '/industries', label: 'Industries' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/dealers', label: 'Dealer Network' },
  { href: '/contact', label: 'Contact' },
]

const SOCIAL = [
  {
    href: 'https://linkedin.com/company/traxon',
    label: 'LinkedIn',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://youtube.com/@traxon',
    label: 'YouTube',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: 'https://instagram.com/traxon',
    label: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-traxon py-16 md:py-20">
        {/* Four column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 md:gap-8">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex"
              aria-label="Scarab by Traxon — Home"
            >
              <Image
                src="/website_logo.png"
                alt="Scarab by Traxon"
                width={160}
                height={57}
                className="h-[57px] w-auto"
              />
            </Link>
            <p className="font-body text-body-sm text-muted leading-relaxed max-w-[220px]">
              American-engineered industrial tracked carriers. Built for the jobs
              that don&apos;t have a plan B.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted hover:text-blue transition-colors duration-200 p-1"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Products */}
          <div className="flex flex-col gap-5">
            <h3 className="font-label text-mono-label uppercase tracking-[0.2em] text-muted">
              Products
            </h3>
            <ul className="flex flex-col gap-3">
              {PRODUCTS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-body-sm text-mild hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div className="flex flex-col gap-5">
            <h3 className="font-label text-mono-label uppercase tracking-[0.2em] text-muted">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {COMPANY.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-body-sm text-mild hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter + Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="font-label text-mono-label uppercase tracking-[0.2em] text-muted">
              Stay Updated
            </h3>
            <p className="font-body text-body-sm text-muted">
              New machine launches, case studies, and industry updates.
            </p>
            <FooterNewsletterForm />
            
            <div className="pt-2 flex flex-col gap-1.5 border-t border-border mt-2">
              <a
                href="mailto:sales@traxon.com"
                className="font-label text-mono-sm text-muted hover:text-blue transition-colors duration-200 tracking-[0.1em]"
              >
                sales@traxon.com
              </a>
              <span className="font-label text-mono-sm text-muted tracking-[0.1em]">
                Mon–Fri · 7am–6pm CT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-traxon py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-label text-mono-sm text-muted tracking-[0.1em]">
            © {new Date().getFullYear()} Traxon Industrial Carriers. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Use' },
              { href: '/sitemap.xml', label: 'Sitemap' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-label text-mono-sm text-muted hover:text-mild transition-colors duration-200 tracking-[0.1em]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

