import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className = '', id, ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="font-label text-mono-sm uppercase tracking-[0.2em] text-muted"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={[
          'w-full',
          'bg-surface border rounded-[3px]',
          'font-body text-body-md text-white',
          'px-4 py-3',
          'placeholder:text-muted',
          'transition-colors duration-200',
          'focus:outline-none',
          error
            ? 'border-red-500 focus:border-red-400'
            : 'border-border focus:border-blue',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="font-label text-mono-sm text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="font-label text-mono-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  )
})

export default Input
