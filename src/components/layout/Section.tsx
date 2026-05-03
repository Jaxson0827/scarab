interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  contained?: boolean
  noPad?: boolean
}

export default function Section({
  children,
  className = '',
  id,
  contained = true,
  noPad = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[!noPad && 'section-padding', className]
        .filter(Boolean)
        .join(' ')}
    >
      {contained ? (
        <div className="container-traxon">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}
