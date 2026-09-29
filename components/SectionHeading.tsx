'use client'

import { useEffect, useRef, useState } from 'react'

interface SectionHeadingProps {
  label:        string
  title:        string
  subtitle?:    string
  index?:       string
  alignment?:   'left' | 'center' | 'split'
  action?:      React.ReactNode
  className?:   string
}

export function SectionHeading({
  label,
  title,
  subtitle,
  index,
  alignment = 'left',
  action,
  className = '',
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  if (alignment === 'center') {
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16 ${className}`}
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          {index && (
            <>
              <span className="number-text text-accent font-mono">{index}</span>
              <span className="w-5 h-px bg-border" aria-hidden />
            </>
          )}
          <span className="label-text">{label}</span>
        </div>
        <h2 className="text-display-section font-light text-text-primary tracking-tight text-balance mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-text-secondary font-light max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    )
  }

  if (alignment === 'split') {
    return (
      <div
        ref={ref}
        className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10 pb-8 border-b border-border/80 mb-12 md:mb-16 ${className}`}
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            {index && (
              <>
                <span className="number-text text-accent font-mono">{index}</span>
                <span className="w-5 h-px bg-border" aria-hidden />
              </>
            )}
            <span className="label-text">{label}</span>
          </div>
          <h2 className="text-display-section font-light text-text-primary tracking-tight">
            {title}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:text-right">
          {subtitle && (
            <p className="text-sm text-text-secondary font-light max-w-md leading-relaxed">
              {subtitle}
            </p>
          )}
          {action}
        </div>
      </div>
    )
  }

  // Standard left alignment with generous max-width to prevent word wrapping
  return (
    <div
      ref={ref}
      className={`max-w-4xl mb-12 md:mb-16 ${className}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="flex items-center gap-3 mb-3.5">
        {index && (
          <>
            <span className="number-text text-accent font-mono">{index}</span>
            <span className="w-5 h-px bg-border" aria-hidden />
          </>
        )}
        <span className="label-text">{label}</span>
      </div>
      <h2 className="text-display-section font-light text-text-primary tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-sm md:text-base text-text-secondary font-light max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
