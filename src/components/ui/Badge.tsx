interface BadgeProps {
  children: React.ReactNode
  variant?: 'blue' | 'muted' | 'outline'
  className?: string
}

const variantClasses = {
  blue: 'bg-[var(--color-blue-dim)] text-blue border border-[rgba(0,194,255,0.2)]',
  muted: 'bg-surface-2 text-muted border border-border',
  outline: 'bg-transparent text-mild border border-border-2',
}

export default function Badge({
  children,
  variant = 'blue',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center',
        'font-label text-mono-sm uppercase tracking-[0.2em]',
        'px-2.5 py-1 rounded-sm',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
