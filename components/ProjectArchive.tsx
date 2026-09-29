'use client'

import {
  useState,
  useMemo,
  useRef,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import {
  projects,
  filterProjects,
  type Project,
  type ArchiveFilterCategory,
} from '@/data/projects'
import { SectionHeading } from './SectionHeading'

/* ── Filter Categories ── */
const FILTER_TABS: ArchiveFilterCategory[] = [
  'ALL',
  'AI PRODUCTS',
  'AI / DATA',
  'COMPUTER VISION',
  'NLP / RAG',
  'MACHINE LEARNING',
  'AUTOMATION',
]

/* ── Lazy Visual Preview Loader ── */
function PreviewVisual({ visualType }: { visualType: string }) {
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

/* ── Extract Year helper ── */
function getYear(dateStr: string): string {
  if (dateStr.includes('2026')) return '2026'
  if (dateStr.includes('2025')) return '2025'
  if (dateStr.includes('2024')) return '2024'
  return '2026'
}

/* ── Single Editorial Project Table Row ── */
function ProjectTableRow({
  project,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: {
  project: Project
  onMouseEnter: (p: Project) => void
  onMouseLeave: () => void
  onMouseMove: (e: ReactMouseEvent) => void
}) {
  const [hov, setHov] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState(false)
  const year = getYear(project.date)

  const handleEnter = () => {
    setHov(true)
    onMouseEnter(project)
  }

  const handleLeave = () => {
    setHov(false)
    onMouseLeave()
  }

  return (
    <div className="project-row-item border-b border-border/80 group">
      {/* Desktop & Tablet Table Row */}
      <div
        className="hidden md:grid grid-cols-12 gap-4 py-5 px-3 items-center hover:bg-bg-secondary/60 rounded-lg transition-colors duration-250 cursor-pointer"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={onMouseMove}
      >
        <Link
          href={`/work/${project.slug}`}
          data-cursor="VIEW"
          aria-label={`Open case study: ${project.title}`}
          className="col-span-12 grid grid-cols-12 gap-4 items-center"
        >
          {/* NUMBER (1 col) */}
          <div className="col-span-1">
            <span
              className="number-text font-mono text-xs transition-transform duration-200 inline-block group-hover:translate-x-1"
              style={{ color: hov ? 'var(--color-accent)' : undefined }}
            >
              {project.number}
            </span>
          </div>

          {/* PROJECT (4 cols) */}
          <div className="col-span-4 min-w-0 pr-2">
            <h3
              className="text-sm lg:text-[15px] font-medium tracking-tight truncate transition-colors duration-200"
              style={{
                color: hov ? 'var(--color-accent)' : 'var(--color-text-primary)',
              }}
            >
              {project.title}
            </h3>
            <p className="text-xs text-text-muted truncate font-light">
              {project.shortDescription}
            </p>
          </div>

          {/* CATEGORY (3 cols) */}
          <div className="col-span-3">
            <span className="label-text text-[9.5px] px-2 py-0.5 border border-border/80 bg-surface rounded text-text-secondary group-hover:border-accent/30 group-hover:text-accent transition-colors">
              {project.category}
            </span>
          </div>

          {/* YEAR (2 cols) */}
          <div className="col-span-2">
            <span className="number-text text-xs text-text-muted font-mono">
              {year}
            </span>
          </div>

          {/* TECHNOLOGY (2 cols) + Arrow */}
          <div className="col-span-2 flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-secondary truncate pr-2">
              {project.technologies.slice(0, 2).join(', ')}
            </span>
            <ArrowUpRight
              size={14}
              className="text-text-muted group-hover:text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
            />
          </div>
        </Link>
      </div>

      {/* Mobile Clean Expandable Accordion Item */}
      <div className="md:hidden py-4 px-2">
        <div
          onClick={() => setExpandedMobile(!expandedMobile)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="number-text text-accent font-mono text-xs font-medium">
              {project.number}
            </span>
            <div>
              <h3 className="text-sm font-medium text-text-primary truncate">
                {project.title}
              </h3>
              <span className="label-text text-[9px] text-text-muted">
                {project.category} · {year}
              </span>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`text-text-muted transition-transform duration-200 ${
              expandedMobile ? 'rotate-180 text-accent' : ''
            }`}
          />
        </div>

        {expandedMobile && (
          <div className="mt-3 pt-3 border-t border-border/60 space-y-3">
            <p className="text-xs text-text-secondary font-light leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono px-2 py-0.5 border border-border/80 rounded bg-surface text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent uppercase tracking-wider font-medium"
              >
                <span>EXPLORE CASE STUDY</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Category Filter Tabs ── */
function CategoryFilter({
  active,
  onChange,
  counts,
}: {
  active: ArchiveFilterCategory
  onChange: (f: ArchiveFilterCategory) => void
  counts: Record<ArchiveFilterCategory, number>
}) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {FILTER_TABS.map((tab) => {
        const isActive = active === tab
        const count = counts[tab] ?? 0
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] font-mono tracking-[0.14em] uppercase border rounded-md transition-all duration-200"
            style={{
              borderColor: isActive ? 'var(--color-text-primary)' : 'var(--color-border)',
              background: isActive ? 'var(--color-text-primary)' : 'var(--color-surface)',
              color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
            }}
          >
            {tab}
            <span
              className="text-[9px] tabular-nums"
              style={{ color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}
            >
              {String(count).padStart(2, '0')}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function buildCounts(all: Project[]): Record<ArchiveFilterCategory, number> {
  const result: Record<ArchiveFilterCategory, number> = {
    ALL: all.length,
    'AI PRODUCTS': 0,
    'AI / DATA': 0,
    'COMPUTER VISION': 0,
    'NLP / RAG': 0,
    'MACHINE LEARNING': 0,
    AUTOMATION: 0,
  }

  FILTER_TABS.forEach((tab) => {
    if (tab !== 'ALL') {
      result[tab] = filterProjects(all, tab).length
    }
  })

  return result
}

/* ── Main Project Archive Component ── */
export function ProjectArchive({ isPage = false }: { isPage?: boolean }) {
  const [filter, setFilter] = useState<ArchiveFilterCategory>('ALL')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const lastProjectRef = useRef<Project | null>(null)

  const allProjects = projects
  const filtered = useMemo(() => filterProjects(allProjects, filter), [allProjects, filter])
  const counts = useMemo(() => buildCounts(allProjects), [allProjects])

  if (activeProject) {
    lastProjectRef.current = activeProject
  }
  const previewProject = activeProject ?? lastProjectRef.current

  const handleFilterChange = (tab: ArchiveFilterCategory) => {
    if (tab === filter) return
    setFilter(tab)

    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.project-row-item')
      if (items.length > 0) {
        gsap.killTweensOf(items)
        gsap.fromTo(
          items,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.03,
            ease: 'power2.out',
            clearProps: 'transform',
          }
        )
      }
    }
  }

  const handleMouseEnter = useCallback((p: Project) => {
    setActiveProject(p)

    if (previewRef.current) {
      gsap.killTweensOf(previewRef.current)
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.22,
        ease: 'power2.out',
      })
    }
  }, [])

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!previewRef.current) return

    const previewW = 280
    const previewH = 220
    const padding = 20

    let targetX = e.clientX + 24
    if (targetX + previewW > window.innerWidth - padding) {
      targetX = e.clientX - previewW - 24
    }

    let targetY = e.clientY - previewH / 2
    if (targetY < padding) targetY = padding
    if (targetY + previewH > window.innerHeight - padding) {
      targetY = window.innerHeight - previewH - padding
    }

    gsap.to(previewRef.current, {
      x: targetX,
      y: targetY,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (previewRef.current) {
      gsap.killTweensOf(previewRef.current)
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          setActiveProject(null)
        },
      })
    }
  }, [])

  const tableContent = (
    <div className="mt-8">
      {/* Category Filter Bar */}
      <div className="pb-6 border-b border-border/80">
        <CategoryFilter
          active={filter}
          onChange={handleFilterChange}
          counts={counts}
        />
      </div>

      {/* Desktop Column Header Bar */}
      <div className="hidden md:grid grid-cols-12 gap-4 py-3.5 px-3 border-b border-border/80 text-[10px] font-mono tracking-widest uppercase text-text-muted">
        <div className="col-span-1">NUMBER</div>
        <div className="col-span-4">PROJECT</div>
        <div className="col-span-3">CATEGORY</div>
        <div className="col-span-2">YEAR</div>
        <div className="col-span-2">TECHNOLOGY</div>
      </div>

      {/* Table Rows */}
      <div ref={listRef}>
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="label-text text-text-muted">NO PROJECTS IN THIS CATEGORY</p>
          </div>
        ) : (
          filtered.map((p) => (
            <ProjectTableRow
              key={p.slug}
              project={p}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            />
          ))
        )}
      </div>
    </div>
  )

  return (
    <>
      {isPage ? (
        <div className="min-h-screen bg-bg-primary text-text-primary">
          <header className="border-b border-border sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
              <Link
                href="/#archive"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-text-secondary hover:text-text-primary transition-colors group"
                aria-label="Back to home"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                BACK TO HOME
              </Link>
              <span className="label-text text-text-muted tracking-widest text-[10px]">
                PROJECT ARCHIVE
              </span>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-6 md:px-10 py-16 pb-32">
            <div className="pb-10 border-b border-border/80">
              <div className="flex items-end justify-between gap-8 flex-wrap">
                <div>
                  <span className="label-text mb-3 block text-accent">07 // COMPLETE DIRECTORY</span>
                  <h1 className="text-display-section font-light tracking-tight text-text-primary">
                    PROJECT ARCHIVE
                  </h1>
                </div>
                <div className="text-right">
                  <span className="font-mono text-3xl font-light text-accent">09</span>
                  <span className="label-text block text-[9.5px]">TOTAL REPOSITORIES</span>
                </div>
              </div>
            </div>

            {tableContent}
          </main>
        </div>
      ) : (
        <section
          id="archive"
          className="border-b border-border/80 bg-bg-primary py-24 md:py-32"
          aria-label="Project archive"
        >
          <div className="section-container">
            <SectionHeading
              index="07"
              label="PROJECT ARCHIVE"
              title="Complete project directory & engineering experiments."
              subtitle="All 09 software artifacts organized into an architectural ledger with interactive preview inspection."
              alignment="split"
              action={
                <div className="text-left sm:text-right">
                  <span className="font-mono text-2xl sm:text-3xl font-light text-accent tabular-nums">
                    09
                  </span>
                  <span className="label-text block text-[9px] text-text-muted tracking-widest">
                    VERIFIED PROJECTS
                  </span>
                </div>
              }
            />

            {tableContent}
          </div>
        </section>
      )}

      {/* Floating Hover Preview Frame (Desktop only) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden lg:block"
        style={{
          width: 280,
          opacity: 0,
          transform: 'scale(0.94)',
          willChange: 'transform, opacity',
        }}
      >
        {previewProject && (
          <div className="border border-border bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-lg overflow-hidden">
            <div style={{ aspectRatio: '16/10', background: 'var(--color-bg-secondary)' }}>
              <PreviewVisual visualType={previewProject.visualType || previewProject.slug} />
            </div>

            <div className="p-3 border-t border-border/80 bg-surface">
              <span className="number-text text-[10px] block text-accent font-mono">
                {previewProject.number} {'//'} {previewProject.category}
              </span>
              <span className="text-xs font-medium text-text-primary block mt-0.5 truncate">
                {previewProject.title}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
