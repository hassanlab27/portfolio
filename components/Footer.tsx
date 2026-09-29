'use client'

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/hassanlab27' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hafiz-muneeb-hassan/' },
  { label: 'Email',    href: 'mailto:hafizmuneebhassan27@gmail.com' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-bg-primary py-12 md:py-16" role="contentinfo">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-border/70">
          {/* Identity */}
          <div>
            <h3 className="font-mono text-sm font-medium tracking-[0.14em] uppercase text-text-primary mb-1">
              HAFIZ MUNEEB HASSAN
            </h3>
            <p className="label-text text-[10px] text-text-muted">
              AI/ML ENGINEER · AI PRODUCT ENGINEER
            </p>
          </div>

          {/* Location & Status */}
          <div className="flex items-center gap-2.5 text-xs font-mono text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>LAHORE, PAKISTAN</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6" aria-label="Social links">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-xs font-mono tracking-wider uppercase text-text-secondary hover:text-accent transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-text-muted">
          <span>© 2026 Hafiz Muneeb Hassan. All rights reserved.</span>
          <span>BUILT FOR PRECISION & SCALABILITY</span>
        </div>
      </div>
    </footer>
  )
}
