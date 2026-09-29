'use client'

import { useState } from 'react'
import type { SkillCategory } from '@/data/skills'
import { SectionHeading } from './SectionHeading'
import { useInView } from '@/hooks/useInView'

export function TechStack({ categories }: { categories: SkillCategory[] }) {
  const [ref, vis] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section
      id="expertise"
      className="border-b border-border/80 bg-bg-secondary/50 py-24 md:py-32"
      aria-label="Engineering Expertise"
    >
      <div ref={ref} className="section-container">
        {/* Balanced Centered Heading */}
        <SectionHeading
          index="04"
          label="ENGINEERING EXPERTISE"
          title="Tools, technologies, and engineering capabilities."
          subtitle="The systems, frameworks, and platforms I use to build intelligent products and production-ready AI software."
          alignment="center"
        />

        {/* 3-Column Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="p-6 sm:p-7 border border-border/80 bg-surface rounded-xl shadow-sm hover:border-accent/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              }}
            >
              <div>
                {/* Header: Number & Category */}
                <div className="flex items-center justify-between pb-3.5 border-b border-border/60 mb-4">
                  <span className="label-text text-accent font-mono text-[10px] tracking-widest">
                    {cat.number} {'//'} CATEGORY
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                </div>

                <h3 className="text-base font-medium tracking-tight text-text-primary mb-2">
                  {cat.category}
                </h3>

                <p className="text-xs text-text-secondary font-light leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                {cat.skills.map((skill) => {
                  const isActive = hoveredSkill === skill
                  return (
                    <span
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`px-2.5 py-1 text-[11px] font-mono tracking-wider rounded border transition-colors cursor-default ${
                        isActive
                          ? 'border-accent bg-accent/10 text-accent font-medium'
                          : 'border-border/70 bg-bg-secondary/60 text-text-secondary hover:border-text-secondary'
                      }`}
                    >
                      {skill}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Active Skill Indicator */}
        <div className="mt-8 text-center h-6 flex items-center justify-center">
          {hoveredSkill && (
            <p className="label-text text-[10px] tracking-widest text-text-muted">
              INSPECTION FOCUS:&nbsp;
              <span className="text-accent font-medium">{hoveredSkill.toUpperCase()}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
