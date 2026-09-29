'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'
import { projects } from '@/data/projects'

/* ── lazy visual loader ─────────────────────────────────────────────────── */
function VisualLoader({ visualType }: { visualType: string }) {
  const Comp = dynamic(
    () => import('./ProjectVisual').then((m) => {
      const C = m.VISUAL_MAP[visualType]
      return C
        ? { default: C as React.ComponentType<object> }
        : { default: () => <div className="w-full h-full bg-bg-secondary" /> }
    }),
    { ssr: false, loading: () => <div className="w-full h-full bg-bg-secondary animate-pulse" /> }
  )
  return <Comp />
}

/* ── editorial content block ────────────────────────────────────────────── */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12 pb-12 border-b border-border/80">
      <h2 className="label-text text-accent mb-4 tracking-[0.16em] uppercase">{title}</h2>
      {children}
    </section>
  )
}

/* ── reusable case study page template ──────────────────────────────────── */
export function CaseStudyPage({ project }: { project: Project }) {
  const [mounted, setMounted] = useState(false)

  // Smooth subtle page transition (300-400ms max)
  useEffect(() => {
    setMounted(true)
  }, [])

  const idx = projects.findIndex((p) => p.slug === project.slug || p.id === project.id)
  const prev = idx > 0 ? projects[idx - 1] : null
  const next = idx < projects.length - 1 ? projects[idx + 1] : null

  return (
    <div
      className="min-h-screen bg-bg-primary text-text-primary"
      style={{
        opacity:    mounted ? 1 : 0,
        transform:  mounted ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* ── Sticky Top Header with Back Navigation ──────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.16em] uppercase text-text-secondary hover:text-text-primary transition-colors group"
            aria-label="Back to projects"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
            <span>← BACK TO PROJECTS</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="number-text text-[11px]">{project.number} / 09</span>
            <span className="w-4 h-px bg-border" aria-hidden />
            <span className="label-text text-accent text-[9px] hidden sm:block">
              {project.category}
            </span>
          </div>
        </div>
      </header>

      {/* ── Main Case Study Article ───────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 md:px-10 pt-14 pb-28">

        {/* ── Header Metadata ── */}
        <div className="mb-12">
          {/* Project number & category */}
          <div className="flex items-center gap-3 mb-5">
            <span className="number-text text-accent font-medium">{project.number}</span>
            <span className="w-6 h-px bg-border" aria-hidden />
            <span className="label-text text-accent tracking-[0.16em] uppercase">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-light tracking-tight text-text-primary mb-4"
            style={{
              fontSize:      'clamp(2.5rem, 5.8vw, 4.8rem)',
              lineHeight:    '1.02',
              letterSpacing: '-0.03em',
            }}
          >
            {project.title}
          </h1>

          {/* Date */}
          <p className="number-text mb-8 text-text-muted">{project.date}</p>

          {/* Short description */}
          <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-2xl">
            {project.shortDescription}
          </p>
        </div>

        {/* ── CUSTOM PROJECT VISUAL ── */}
        <div
          className="relative overflow-hidden bg-bg-secondary border border-border/80 mb-16"
          style={{ aspectRatio: '16/7' }}
          aria-hidden
        >
          <VisualLoader visualType={project.visualType || project.slug} />
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <span className="number-text text-[9px] bg-bg-primary/90 px-2 py-0.5 backdrop-blur-sm border border-border/40">
              TECHNICAL PIPELINE
            </span>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16">

          {/* Left Column: Narrative & Technical Depth */}
          <div>

            {/* OVERVIEW */}
            <Block title="OVERVIEW">
              <p className="text-[15px] text-text-secondary leading-[1.8] font-light">
                {project.overview}
              </p>
            </Block>

            {/* THE IDEA */}
            {project.idea && (
              <Block title="THE IDEA">
                <p className="text-[15px] text-text-secondary leading-[1.8] font-light">
                  {project.idea}
                </p>
              </Block>
            )}

            {/* WORKFLOW (Visual technical pipeline) */}
            <Block title="WORKFLOW">
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {project.workflow.map((step, i) => (
                  <div key={i} className="inline-flex items-center gap-2">
                    <span className="px-3 py-1.5 border border-accent/25 text-[10px] font-mono tracking-[0.12em] uppercase text-accent bg-accent/[0.02]">
                      {step}
                    </span>
                    {i < project.workflow.length - 1 && (
                      <span className="number-text text-text-muted text-[10px]" aria-hidden>
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Block>

            {/* KEY FEATURES */}
            <Block title="KEY FEATURES">
              <ul className="space-y-3.5" role="list">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-[7px]"
                      aria-hidden
                    />
                    <span className="text-[14px] text-text-secondary leading-relaxed font-light">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            {/* ENGINEERING APPROACH */}
            <Block title="ENGINEERING APPROACH">
              <p className="text-[14.5px] text-text-secondary leading-[1.8] font-light">
                {project.engineeringNotes}
              </p>
            </Block>

            {/* LINKS (Only display verified URLs, never fake URLs) */}
            {(project.github || project.liveDemo) && (
              <section className="pt-2 flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border text-[11px] font-mono tracking-[0.14em] uppercase text-text-secondary hover:border-text-primary hover:text-text-primary transition-all duration-200"
                  >
                    <Github size={13} />
                    <span>GITHUB REPOSITORY</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-white text-[11px] font-mono tracking-[0.14em] uppercase hover:bg-accent transition-colors duration-200"
                  >
                    <ExternalLink size={13} />
                    <span>LIVE DEMO</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
              </section>
            )}
          </div>

          {/* Right Column: Metadata Sidebar */}
          <aside className="space-y-6 self-start" aria-label="Project metadata">

            {/* CATEGORY */}
            <div className="border border-border p-5">
              <h3 className="label-text text-accent mb-2.5 tracking-[0.14em] uppercase">CATEGORY</h3>
              <p className="text-[13px] font-medium text-text-primary">{project.category}</p>
            </div>

            {/* TECHNOLOGY (Verified only) */}
            <div className="border border-border p-5">
              <h3 className="label-text text-accent mb-3 tracking-[0.14em] uppercase">TECHNOLOGY</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[9px] font-mono tracking-[0.08em] uppercase border border-border text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* DATE */}
            <div className="border border-border p-5">
              <h3 className="label-text text-accent mb-2 tracking-[0.14em] uppercase">TIMELINE</h3>
              <p className="number-text text-text-primary text-[11.5px]">{project.date}</p>
            </div>

            {/* TAGS */}
            <div className="border border-border p-5">
              <h3 className="label-text text-accent mb-3 tracking-[0.14em] uppercase">TAGS</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span key={t} className="tech-tag text-[9px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick back link */}
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.14em] uppercase text-text-muted hover:text-accent transition-colors pt-2"
            >
              <ArrowLeft size={11} />
              <span>← BACK TO PROJECTS</span>
            </Link>
          </aside>
        </div>

        {/* ── Previous & Next Project Navigation ────────────────────────── */}
        <nav className="mt-20 pt-10 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Adjacent projects">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-col gap-1.5 p-6 border border-border hover:border-accent/30 transition-all duration-300"
            >
              <span className="label-text text-text-muted tracking-[0.14em]">← PREVIOUS</span>
              <span className="number-text text-accent text-[11px] mt-1">{prev.number}</span>
              <span
                className="font-light tracking-tight group-hover:text-accent transition-colors duration-200"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', letterSpacing: '-0.015em' }}
              >
                {prev.title}
              </span>
              <span className="number-text text-text-muted text-[10.5px]">{prev.category}</span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col gap-1.5 p-6 border border-border hover:border-accent/30 transition-all duration-300 sm:text-right"
            >
              <span className="label-text text-text-muted tracking-[0.14em]">NEXT →</span>
              <span className="number-text text-accent text-[11px] mt-1">{next.number}</span>
              <span
                className="font-light tracking-tight group-hover:text-accent transition-colors duration-200"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', letterSpacing: '-0.015em' }}
              >
                {next.title}
              </span>
              <span className="number-text text-text-muted text-[10.5px]">{next.category}</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* ── Bottom Back Navigation Link ───────────────────────────────── */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.16em] uppercase text-text-muted hover:text-text-primary transition-colors group"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>← BACK TO PROJECTS</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
