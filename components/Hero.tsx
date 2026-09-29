'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { AiSystemVisual } from './AiSystemVisual'
import { useLenis } from './SmoothScroll'

/* ── Magnetic CTA Button ────────────────────────────────────── */
function MagneticBtn({
  children,
  onClick,
  variant = 'primary',
  as: Tag = 'button',
  href,
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  as?: 'button' | 'a'
  href?: string
}) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.25
    const y = (e.clientY - r.top - r.height / 2) * 0.25
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  const base =
    'magnetic-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] tracking-[0.16em] font-mono uppercase select-none rounded-lg transition-all duration-300'
  const styles =
    variant === 'primary'
      ? 'bg-text-primary text-white hover:bg-accent shadow-sm'
      : 'border border-border/90 text-text-secondary hover:border-text-primary hover:text-text-primary bg-surface/50'

  return (
    <Tag
      ref={ref as any}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      href={href}
      className={`${base} ${styles}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Tag>
  )
}

/* ── Hero Component ─────────────────────────────────────────── */
export function Hero() {
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVis(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const lenis = useLenis()

  /* ── Smooth Scroll Helper ── */
  const goTo = (id: string) => {
    const el = document.querySelector<HTMLElement>(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -72 })
    else if (typeof window !== 'undefined' && (window as any).lenis) {
      ;(window as any).lenis.scrollTo(el, { offset: -72, duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-[90svh] lg:min-h-screen flex flex-col justify-center overflow-hidden border-b border-border/80 bg-bg-primary pt-24 pb-16 lg:py-24"
      aria-label="Introduction"
    >
      <div className="section-container w-full">
        {/* Top: Small Editorial Metadata */}
        <div
          className="flex items-center justify-between pb-6 mb-8 lg:mb-12 border-b border-border/70"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="number-text text-accent font-mono text-[11px] font-medium">01</span>
            <span className="w-5 h-px bg-border" aria-hidden />
            <span className="label-text tracking-[0.18em]">AI/ML ENGINEER</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="number-text text-[11px] font-mono tracking-wider text-text-muted">
              LAHORE, PAKISTAN
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* 12-Column Responsive Grid: 6 cols narrative / 6 cols AI architecture visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (5-6 cols on desktop) */}
          <div
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            {/* Title / Name */}
            <h1 className="text-display-hero font-light tracking-tight text-text-primary mb-4">
              HAFIZ MUNEEB<br />
              <span className="font-normal text-text-primary">HASSAN</span>
            </h1>

            {/* Sub-tag / Role */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="label-text text-accent tracking-[0.16em] font-medium">
                AI/ML ENGINEER
              </span>
              <span className="text-text-muted text-xs">·</span>
              <span className="label-text text-text-secondary tracking-[0.16em]">
                AI PRODUCT ENGINEER
              </span>
            </div>

            {/* Concise Positioning Statement */}
            <p className="text-base sm:text-lg text-text-secondary font-light leading-relaxed max-w-xl mb-9">
              I build AI-powered products, intelligent systems, LLM applications, RAG pipelines, and
              machine-learning solutions that turn complex ideas into usable software.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <MagneticBtn onClick={() => goTo('#work')} variant="primary">
                VIEW SELECTED WORK
              </MagneticBtn>
              <MagneticBtn onClick={() => goTo('#contact')} variant="secondary">
                GET IN TOUCH
              </MagneticBtn>
            </div>

            {/* Status & Availability Strip */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/60">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="number-text text-text-muted text-[11px] tracking-wider uppercase font-mono">
                AVAILABLE FOR ENGINEERING ROLES & AI PRODUCTS
              </span>
            </div>
          </div>

          {/* Right Column (6 cols on desktop): Dynamic Visual System */}
          <div
            className="lg:col-span-6 xl:col-span-6 flex justify-center"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.85s ease 0.3s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.3s',
            }}
          >
            <AiSystemVisual />
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator */}
        <div
          className="mt-12 lg:mt-16 pt-6 border-t border-border/60 flex items-center justify-between"
          style={{
            opacity: vis ? 1 : 0,
            transition: 'opacity 0.9s ease 0.45s',
          }}
        >
          <div className="hidden sm:flex items-center gap-6 number-text text-text-muted text-[11px]">
            <span>AI / ML ENGINEER</span>
            <span>·</span>
            <span>INTELLIGENT SYSTEMS & AI PRODUCTS</span>
          </div>

          <button
            onClick={() => goTo('#about')}
            className="inline-flex items-center gap-2 group text-text-secondary hover:text-accent transition-colors ml-auto"
            aria-label="Scroll to explore"
          >
            <span className="number-text text-[10px] tracking-[0.16em] uppercase font-mono group-hover:text-accent">
              SCROLL TO EXPLORE
            </span>
            <ArrowDown
              size={12}
              className="text-text-muted group-hover:text-accent transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
