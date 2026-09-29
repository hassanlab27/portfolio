'use client'

import { useEffect, useRef, useState } from 'react'

const BLOCKS = [
  { number: '09', text: 'VERIFIED PROJECTS' },
  { number: '02', text: 'ENGINEERING APPOINTMENTS' },
  { number: '03', text: 'TECHNICAL CREDENTIALS' },
  { number: '01', text: 'B.S. AI DEGREE' },
  { number: '06', text: 'EXPERTISE DOMAINS' },
]

export function EditorialStrip() {
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
      { threshold: 0.2 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="border-b border-border/80 bg-bg-secondary/60 overflow-x-auto py-3"
      aria-hidden
    >
      <div
        className="section-container flex min-w-max items-center justify-between"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {BLOCKS.map(({ number, text }, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-4 border-r border-border/60 last:border-r-0 flex-shrink-0"
          >
            <span className="font-mono text-2xl sm:text-3xl font-light text-accent tabular-nums">
              {number}
            </span>
            <span className="label-text text-text-muted text-[10px] tracking-wider whitespace-nowrap">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
