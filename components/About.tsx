'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

export function About() {
  const [ref, vis] = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section
      id="about"
      className="border-b border-border/80 bg-bg-secondary/40 py-24 md:py-32"
      aria-label="About Hafiz Muneeb Hassan"
    >
      <div ref={ref} className="section-container">
        {/* 2-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (4-5 columns): 01 ABOUT + Portrait */}
          <div
            className="lg:col-span-4 flex flex-col"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Editorial Number & Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="number-text text-accent font-mono text-sm font-medium">01</span>
              <span className="w-6 h-px bg-border" aria-hidden />
              <span className="label-text tracking-[0.2em]">ABOUT</span>
            </div>

            <h2 className="text-display-section font-light text-text-primary tracking-tight mb-8">
              Engineering AI systems with product craft.
            </h2>

            {/* Editorial Portrait Card */}
            <div className="border border-border/80 bg-surface rounded-xl overflow-hidden shadow-sm max-w-sm">
              <div className="relative aspect-[4/5] bg-bg-secondary overflow-hidden">
                <Image
                  src="/portrait.jpg"
                  alt="Hafiz Muneeb Hassan - AI/ML Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-border/80 bg-surface flex items-center justify-between text-xs font-mono">
                <span className="text-text-primary font-medium">Hafiz Muneeb Hassan</span>
                <span className="text-accent">AI/ML ENGINEER</span>
              </div>
            </div>
          </div>

          {/* Right Column (7-8 columns): Narrative & Structured Metadata */}
          <div
            className="lg:col-span-8 flex flex-col justify-between pt-2 lg:pt-8"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            {/* Concise Bio Paragraphs */}
            <div className="space-y-6 max-w-3xl mb-12">
              <p className="text-lg md:text-xl text-text-primary font-light leading-relaxed">
                I am an AI/ML Engineer and AI Product Engineer focused on developing intelligent
                systems that bridge theoretical machine learning and production-ready software.
              </p>
              <p className="text-base text-text-secondary font-light leading-relaxed">
                My work centers on designing end-to-end LLM applications, retrieval-augmented
                generation (RAG) pipelines, computer vision systems, and automated machine learning
                workflows. I build with an emphasis on system stability, low latency, and clear
                product ergonomics.
              </p>
            </div>

            {/* Structured Metadata Grid (BASED IN, FOCUS, STATUS) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-border/80">
              {/* BASED IN */}
              <div>
                <span className="label-text block mb-3 text-accent tracking-widest font-mono">
                  BASED IN
                </span>
                <p className="text-sm font-medium text-text-primary mb-1">
                  Lahore, Pakistan
                </p>
                <p className="text-xs text-text-muted font-light">
                  Open to remote & on-site technical roles
                </p>
              </div>

              {/* FOCUS */}
              <div>
                <span className="label-text block mb-3 text-accent tracking-widest font-mono">
                  FOCUS
                </span>
                <ul className="space-y-1 text-sm text-text-secondary font-light">
                  <li className="text-text-primary font-medium">AI/ML Engineering</li>
                  <li>AI Products & APIs</li>
                  <li>LLMs & RAG Architectures</li>
                  <li>Machine Learning Pipelines</li>
                </ul>
              </div>

              {/* STATUS */}
              <div>
                <span className="label-text block mb-3 text-accent tracking-widest font-mono">
                  STATUS
                </span>
                <p className="text-sm font-medium text-text-primary mb-1">
                  AI/ML Engineer
                </p>
                <p className="text-xs text-text-secondary mb-1">
                  B.S. Artificial Intelligence
                </p>
                <p className="text-xs text-text-muted font-mono">
                  Superior University (2024 — Present)
                </p>
              </div>
            </div>

            {/* Core Capabilities Tags */}
            <div className="mt-12 pt-8 border-t border-border/70 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-text-muted mr-2">CORE AREAS:</span>
              {[
                'Python',
                'PyTorch',
                'FastAPI',
                'Next.js',
                'RAG Pipelines',
                'AutoML',
                'Vector Databases',
                'Computer Vision',
              ].map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-surface border border-border text-text-secondary rounded"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Recruiter Action Strip */}
            <div className="mt-8 pt-6 border-t border-border/70 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-text-primary text-white text-xs font-mono tracking-[0.14em] uppercase rounded-lg hover:bg-accent transition-colors shadow-sm"
              >
                <span>GET IN TOUCH</span>
                <span>→</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border/90 bg-surface text-text-primary text-xs font-mono tracking-[0.14em] uppercase rounded-lg hover:border-accent hover:text-accent transition-colors"
              >
                <span>VIEW RESUME (PDF)</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
