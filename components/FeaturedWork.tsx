'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

/* ── Lazy Visual Loader ── */
function VisualLoader({ visualType }: { visualType: string }) {
  const Comp = dynamic(
    () =>
      import('./ProjectVisual').then((m) => {
        const C = m.VISUAL_MAP[visualType]
        return C
          ? { default: C as React.ComponentType<object> }
          : { default: () => <div className="w-full h-full bg-bg-secondary" /> }
      }),
    { ssr: false, loading: () => <div className="w-full h-full bg-bg-secondary" /> }
  )
  return <Comp />
}

/* ── Editorial Project Row ── */
function EditorialProjectRow({
  project,
  index,
  tagline,
  techStack,
  description,
}: {
  project: Project
  index: number
  tagline: string
  techStack: string[]
  description: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="py-12 md:py-16 border-b border-border/80 first:border-t transition-all duration-300"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (2 cols): Project Index */}
        <div className="lg:col-span-1">
          <span
            className="number-text text-lg sm:text-xl font-mono transition-colors duration-250"
            style={{ color: hov ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
          >
            {project.number}
          </span>
        </div>

        {/* Center Column (6-7 cols): Project Information */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="label-text text-accent tracking-[0.18em] font-mono text-[10px]">
              {tagline}
            </span>
          </div>

          <h3
            className="text-display-project font-medium tracking-tight mb-3 transition-colors duration-250"
            style={{
              color: hov ? 'var(--color-accent)' : 'var(--color-text-primary)',
            }}
          >
            {project.title}
          </h3>

          <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed mb-6 max-w-xl">
            {description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase border border-border/80 bg-surface text-text-secondary rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Link */}
          <Link
            href={`/work/${project.slug}`}
            data-cursor="VIEW"
            className="group/cta inline-flex items-center gap-2 text-xs font-mono tracking-[0.16em] uppercase text-text-primary hover:text-accent transition-colors font-medium"
          >
            <span>VIEW CASE STUDY</span>
            <span className="transition-transform group-hover/cta:translate-x-1">→</span>
          </Link>
        </div>

        {/* Right Column (4-5 cols): Visual Preview Frame */}
        <div className="lg:col-span-5">
          <Link
            href={`/work/${project.slug}`}
            data-cursor="VIEW"
            aria-label={`View case study: ${project.title}`}
            className="block relative aspect-[16/10] overflow-hidden rounded-xl border border-border/80 bg-bg-secondary group/img shadow-sm"
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{ transform: hov ? 'scale(1.03)' : 'scale(1)' }}
            >
              <VisualLoader visualType={project.visualType || project.slug} />
            </div>

            {/* Corner Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="number-text text-[10px] font-mono bg-surface/90 backdrop-blur-sm px-2.5 py-1 border border-border/60 rounded">
                {project.number} {'//'} {project.category}
              </span>
            </div>

            {/* Hover Accent Glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(29,78,216,0.06) 0%, transparent 60%)',
                opacity: hov ? 1 : 0,
              }}
            />
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ── Section Component ── */
export function FeaturedWork() {
  const orvix = projects.find((p) => p.slug === 'orvix') || projects[0]
  const autodatabot = projects.find((p) => p.slug === 'autodatabot') || projects[1]

  return (
    <section
      id="work"
      className="border-b border-border/80 bg-bg-primary py-24 md:py-32"
      aria-label="Selected Work"
    >
      <div className="section-container">
        {/* Section Heading with split layout */}
        <SectionHeading
          index="03"
          label="SELECTED WORK"
          title="AI systems, intelligent products, and engineering experiments."
          subtitle="Deep dive case studies showcasing architecture, data pipelines, model orchestration, and interface design."
          alignment="split"
          action={
            <Link
              href="#archive"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.14em] uppercase text-accent hover:text-text-primary transition-colors py-2 px-3 border border-border/80 rounded"
            >
              <span>EXPLORE ALL PROJECTS</span>
              <ArrowUpRight size={13} />
            </Link>
          }
        />

        {/* Major Editorial Project Rows */}
        <div className="mt-8">
          <EditorialProjectRow
            project={orvix}
            index={0}
            tagline="AI ADAPTIVE LEARNING PLATFORM"
            techStack={['Next.js', 'Gemini', 'Mistral 7B', 'GPT', 'TypeScript']}
            description="A multi-model educational intelligence platform that assesses real-time student mastery, personalizes interactive curricula, and dynamically generates conceptual evaluations."
          />

          <EditorialProjectRow
            project={autodatabot}
            index={1}
            tagline="AUTOMATED DATA ANALYSIS & AUTOML"
            techStack={['Python', 'FastAPI', 'Scikit-learn', 'AutoGluon', 'Pandas']}
            description="An automated data intelligence platform that transforms raw datasets into cleaned, analyzed, trained, and explainable ML outcomes."
          />
        </div>
      </div>
    </section>
  )
}
