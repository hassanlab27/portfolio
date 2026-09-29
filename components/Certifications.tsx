'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Certification } from '@/data/certifications'
import { SectionHeading } from './SectionHeading'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useInView } from '@/hooks/useInView'

/* ── Certificate Modal / Lightbox ── */
function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certification | null
  onClose: () => void
}) {
  const trapRef = useFocusTrap(!!cert, onClose)

  if (!cert) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      {/* Blurred Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity" />

      {/* Modal Dialog Card */}
      <div
        ref={trapRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-4xl bg-surface border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/80 bg-surface/90 backdrop-blur-sm">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="number-text text-accent text-xs font-mono">{cert.number}</span>
              <span className="text-text-muted text-xs">/</span>
              <span className="text-xs text-text-muted uppercase tracking-wider">{cert.issuer}</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary tracking-tight truncate">
              {cert.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {cert.imageUrl && (
              <a
                href={cert.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent border border-border/80 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Full Image</span>
                <span className="text-[10px]">↗</span>
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary border border-border/60 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/5 dark:bg-black/40 min-h-[300px]">
          {cert.imageUrl ? (
            <div className="relative w-full flex items-center justify-center">
              <Image
                src={cert.imageUrl}
                alt={`${cert.title} - ${cert.issuer}`}
                width={1024}
                height={725}
                priority
                className="w-auto h-auto max-h-[72vh] max-w-full object-contain rounded-lg shadow-lg border border-border/40"
              />
            </div>
          ) : (
            <div className="text-center py-16 px-6 max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <span className="font-mono text-sm font-semibold">01</span>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 mb-3">
                {cert.status || 'Certificate Coming Soon'}
              </span>
              <h4 className="text-lg font-medium text-text-primary mb-2">
                Credential In Progress
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 font-light">
                This certification is currently underway and the verified official credential will be published upon completion in {cert.date}.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-mono tracking-wider uppercase bg-surface hover:bg-border text-text-primary rounded-lg border border-border/80 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border/60 bg-surface/60 flex items-center justify-between text-xs text-text-muted">
          <span>{cert.date}</span>
          <span className="font-mono text-[11px] uppercase">
            {cert.imageUrl ? 'Verified Credential' : 'Expected Credential'}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Section Component ── */
export function Certifications({
  certifications,
}: {
  certifications: Certification[]
}) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [ref, vis] = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section
      id="certifications"
      className="border-b border-border/80 bg-bg-primary py-24 md:py-32"
      aria-label="Qualifications and certifications"
    >
      <div ref={ref} className="section-container">
        {/* 2-Column Layout: 4 cols metadata / 8 cols clean editorial list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Metadata Column */}
          <div
            className="lg:col-span-4"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="number-text text-accent font-mono text-sm font-medium">05</span>
              <span className="w-6 h-px bg-border" aria-hidden />
              <span className="label-text tracking-[0.2em]">CERTIFICATIONS</span>
            </div>

            <h2 className="text-display-section font-light text-text-primary tracking-tight mb-4">
              Verified credentials & professional accreditations.
            </h2>

            <p className="text-sm text-text-secondary font-light leading-relaxed max-w-sm mb-8">
              Rigorous industry examinations and verified training programs in Machine Learning,
              Artificial Intelligence, and Full-Stack Engineering.
            </p>

            <div className="pt-6 border-t border-border/70 text-xs font-mono text-text-muted">
              CLICK ANY QUALIFICATION TO VIEW CREDENTIAL
            </div>
          </div>

          {/* Right Column: Editorial Numbered Rows */}
          <div
            className="lg:col-span-8"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            <div className="divide-y divide-border/80 border-t border-b border-border/80">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedCert(cert)
                    }
                  }}
                  className="group py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-bg-secondary/40 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-lg transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  {/* Left info */}
                  <div className="flex items-baseline gap-5 sm:gap-6 min-w-0 flex-1">
                    <span className="number-text text-accent font-mono text-xs font-medium flex-shrink-0">
                      {cert.number}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-medium tracking-tight text-text-primary group-hover:text-accent transition-colors">
                          {cert.title}
                        </h3>
                        {cert.isComingSoon && (
                          <span className="inline-flex items-center text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                            Certificate Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary font-light">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Right: Date & Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 flex-shrink-0 pl-10 sm:pl-0">
                    <span className="number-text text-text-muted text-xs">
                      {cert.date}
                    </span>

                    {cert.imageUrl ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-surface border border-border group-hover:border-accent group-hover:text-accent transition-colors">
                        <span>View</span>
                        <span className="text-[10px]">↗</span>
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-text-muted group-hover:text-accent transition-colors">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  )
}
