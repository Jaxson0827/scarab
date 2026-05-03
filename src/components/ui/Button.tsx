import Link from 'next/link'

interface ButtonProps {
  variant: 'primary' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  href?: string
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  tabIndex?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
  target?: string
  rel?: string
}

const sizeClasses = {
  sm: 'px-5 py-2.5 text-[11px]',
  md: 'px-8 py-4 text-[12px]',
  lg: 'px-10 py-5 text-[13px]',
}

const variantClasses = {
  primary: [
    'bg-blue text-black font-label uppercase tracking-widest',
    'hover:opacity-85 hover:-translate-y-px',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0',
  ].join(' '),
  ghost: [
    'border border-border-2 text-mild font-label uppercase tracking-widest',
    'hover:border-blue hover:text-white',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
  text: [
    'text-mild font-label uppercase tracking-widest',
    'hover:text-white',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

export default function Button({
  variant,
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  href,
  className = '',
  children,
  type = 'button',
  tabIndex,
  onKeyDown,
  target,
  rel,
}: ButtonProps) {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'rounded-[3px]',
    'transition-all duration-200 cursor-pointer',
    'select-none',
    variantClasses[variant],
    sizeClasses[size],
    loading ? 'opacity-70 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = loading ? (
    <>
      <Spinner />
      <span className="sr-only">Loading</span>
    </>
  ) : (
    children
  )

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-disabled={disabled || loading}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={base}
      onClick={onClick}
      disabled={disabled || loading}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      aria-busy={loading}
    >
      {content}
    </button>
  )
}
