'use client'

import { ArrowUpRight, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

export function Contact() {
  const [ref, vis] = useInView<HTMLElement>({ threshold: 0.15 })

  return (
    <section
      id="contact"
      ref={ref}
      className="border-b border-border/80 bg-bg-secondary/40 py-24 md:py-36"
      aria-label="Contact and collaboration"
    >
      <div className="section-container">
        {/* Top: Section Index */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span className="number-text text-accent font-mono text-sm font-medium">08</span>
          <span className="w-6 h-px bg-border" aria-hidden />
          <span className="label-text tracking-[0.2em]">CONTACT</span>
        </div>

        {/* 6/6 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Controlled Headline & Focus */}
          <div
            className="lg:col-span-7"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease 0.1s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            <h2 className="text-display-hero font-light tracking-tight text-text-primary mb-6">
              LET&apos;S BUILD<br />
              SOMETHING<br />
              <span className="font-normal">USEFUL.</span>
            </h2>

            <div className="space-y-2 mb-8 text-sm md:text-base text-text-secondary font-light">
              <p>Specialized engineering for ambitious technical teams and intelligent products:</p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-text-primary">
                <span className="px-2.5 py-1 bg-surface border border-border/80 rounded">
                  AI/ML ENGINEERING
                </span>
                <span className="px-2.5 py-1 bg-surface border border-border/80 rounded">
                  AI PRODUCTS
                </span>
                <span className="px-2.5 py-1 bg-surface border border-border/80 rounded">
                  INTELLIGENT SYSTEMS
                </span>
                <span className="px-2.5 py-1 bg-surface border border-border/80 rounded">
                  AUTOMATION
                </span>
              </div>
            </div>

            {/* Primary CTA */}
            <div>
              <a
                href="mailto:hafizmuneebhassan27@gmail.com"
                data-cursor="EMAIL"
                className="inline-flex items-center gap-3 px-8 py-4 bg-text-primary text-white text-xs font-mono tracking-[0.18em] uppercase rounded-lg hover:bg-accent transition-colors shadow-sm"
              >
                <span>START A CONVERSATION</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Direct Channels & Verification */}
          <div
            className="lg:col-span-5 flex flex-col justify-between pt-2 lg:pt-4"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease 0.2s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            <div className="border border-border/80 bg-surface rounded-xl p-6 sm:p-8 shadow-sm">
              <span className="label-text block mb-6 text-accent font-mono text-[10px] tracking-widest">
                DIRECT CHANNELS
              </span>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:hafizmuneebhassan27@gmail.com"
                  className="flex items-center justify-between p-3.5 border border-border/60 rounded-lg hover:border-accent hover:bg-bg-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-text-muted group-hover:text-accent" />
                    <div>
                      <span className="label-text block text-[9.5px]">EMAIL</span>
                      <span className="text-xs font-mono text-text-primary">
                        hafizmuneebhassan27@gmail.com
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/hafiz-muneeb-hassan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-border/60 rounded-lg hover:border-accent hover:bg-bg-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-text-muted group-hover:text-accent" />
                    <div>
                      <span className="label-text block text-[9.5px]">LINKEDIN</span>
                      <span className="text-xs font-mono text-text-primary">
                        linkedin.com/in/hafiz-muneeb-hassan
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/hassanlab27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-border/60 rounded-lg hover:border-accent hover:bg-bg-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-text-muted group-hover:text-accent" />
                    <div>
                      <span className="label-text block text-[9.5px]">GITHUB</span>
                      <span className="text-xs font-mono text-text-primary">
                        github.com/hassanlab27
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Resume / CV */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-border/60 rounded-lg hover:border-accent hover:bg-bg-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-text-muted group-hover:text-accent" />
                    <div>
                      <span className="label-text block text-[9.5px]">CURRICULUM VITAE</span>
                      <span className="text-xs font-mono text-text-primary">
                        Download PDF Resume
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Status Note */}
              <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-2.5 text-xs text-text-muted font-light">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Typically responding within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
