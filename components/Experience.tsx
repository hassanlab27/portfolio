'use client'

import { useState } from 'react'
import type { Experience as ExperienceType } from '@/data/experience'
import { useInView } from '@/hooks/useInView'

export function ExperienceTimeline({
  experiences,
}: {
  experiences: ExperienceType[]
}) {
  const [ref, vis] = useInView<HTMLDivElement>({ threshold: 0.15 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      id="experience"
      className="border-b border-border/80 bg-bg-primary py-24 md:py-32"
      aria-label="Work Experience"
    >
      <div ref={ref} className="section-container">
        {/* 12-Column Layout: 3-4 cols left metadata / 8-9 cols horizontal timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Metadata Column (3-4 cols) */}
          <div
            className="lg:col-span-4"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="number-text text-accent font-mono text-sm font-medium">02</span>
              <span className="w-6 h-px bg-border" aria-hidden />
              <span className="label-text tracking-[0.2em]">EXPERIENCE</span>
            </div>

            <h2 className="text-display-section font-light text-text-primary tracking-tight mb-4">
              Industry practice & applied AI engineering.
            </h2>

            <p className="text-sm text-text-secondary font-light leading-relaxed max-w-sm">
              Hands-on technical internships building production backend services, distributed scan
              engines, and domain-specific RAG pipelines.
            </p>

            <div className="mt-8 pt-6 border-t border-border/70 flex items-center gap-6 number-text text-text-muted text-xs">
              <span>02 APPOINTMENTS</span>
              <span>·</span>
              <span>2025 — 2026</span>
            </div>
          </div>

          {/* Right Horizontal Editorial Timeline Column (8 cols) */}
          <div
            className="lg:col-span-8"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            {/* Horizontal timeline track on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative">
              {experiences.map((exp, index) => {
                const isHovered = hoveredId === exp.id
                const num = String(index + 1).padStart(2, '0')
                const year = exp.period.includes('2026') ? '2026' : '2025'
                const companyName = exp.company.toUpperCase()

                return (
                  <div
                    key={exp.id}
                    onMouseEnter={() => setHoveredId(exp.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative p-6 sm:p-7 border rounded-xl transition-all duration-300 ${
                      isHovered
                        ? 'border-accent bg-surface shadow-[0_8px_30px_rgba(29,78,216,0.06)] -translate-y-1'
                        : 'border-border/80 bg-surface/60 hover:border-text-secondary'
                    }`}
                  >
                    {/* Top Row: 01 / Year */}
                    <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-5">
                      <span className="number-text text-accent font-mono text-xs font-medium">
                        {num}
                      </span>
                      <span className="number-text font-mono text-xs text-text-muted">
                        {year}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="text-base sm:text-lg font-medium text-text-primary tracking-tight mb-1">
                      {exp.role.toUpperCase()}
                    </h3>
                    <p className="text-xs font-mono tracking-wider text-accent mb-4">
                      {companyName}
                    </p>

                    {/* Concise Summary Paragraph */}
                    <p className="text-sm text-text-secondary font-light leading-relaxed mb-6">
                      {exp.id === 'azuno'
                        ? 'Contributed to SiteDNA security-auditing platform across 15+ parallel scan engines. Engineered CRM backend using Python & PostgreSQL and developed client-facing web application workflows.'
                        : 'Engineered specialized conversational chatbot utilizing Retrieval-Augmented Generation (RAG) over structured religious texts. Handled complete data preprocessing, vector retrieval, and inference.'}
                    </p>

                    {/* Concise Key Responsibilities as Pills */}
                    <div className="pt-4 border-t border-border/50 flex flex-wrap gap-1.5">
                      {exp.responsibilities.slice(0, 3).map((item, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-secondary text-text-secondary border border-border/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
