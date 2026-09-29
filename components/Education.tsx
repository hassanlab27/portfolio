'use client'

import type { Education as EduType } from '@/data/education'
import { useInView } from '@/hooks/useInView'

export function EducationSection({ education }: { education: EduType[] }) {
  const [ref, vis] = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section
      id="education"
      className="border-b border-border/80 bg-bg-secondary/40 py-24 md:py-32"
      aria-label="Education"
    >
      <div ref={ref} className="section-container">
        {/* 2-Column Split: 4 cols left / 8 cols right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Metadata */}
          <div
            className="lg:col-span-4"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="number-text text-accent font-mono text-sm font-medium">06</span>
              <span className="w-6 h-px bg-border" aria-hidden />
              <span className="label-text tracking-[0.2em]">EDUCATION</span>
            </div>

            <h2 className="text-display-section font-light text-text-primary tracking-tight mb-4">
              Academic foundation in computer science & AI.
            </h2>

            <p className="text-sm text-text-secondary font-light leading-relaxed max-w-sm">
              Rigorous degree curriculum focused on algorithmic complexity, mathematical optimization,
              machine learning, and artificial intelligence architectures.
            </p>
          </div>

          {/* Right Compact Editorial Timeline */}
          <div
            className="lg:col-span-8"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div
                  key={edu.id}
                  className="p-6 sm:p-7 border border-border/80 bg-surface rounded-xl shadow-sm hover:border-accent/40 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <span className="number-text text-accent font-mono text-xs block mb-2">
                        {edu.period}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium tracking-tight text-text-primary mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-text-secondary font-light">
                        {edu.institution}
                        <span className="text-border mx-2">·</span>
                        {edu.location}
                      </p>
                    </div>

                    {edu.gpa && (
                      <div className="sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                        <span className="label-text block text-[9px] mb-1">CUMULATIVE GPA</span>
                        <span className="font-mono text-xl sm:text-2xl font-light text-accent tabular-nums">
                          {edu.gpa}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
