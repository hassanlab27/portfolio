'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { label: 'ABOUT',      href: '/#about'      },
  { label: 'WORK',       href: '/#work'       },
  { label: 'EXPERIENCE', href: '/#experience' },
  { label: 'EXPERTISE',  href: '/#expertise'  },
  { label: 'CONTACT',    href: '/#contact'    },
]

export function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const mobileTrapRef = useFocusTrap(mobileOpen, () => setMobileOpen(false))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      setScrolled(scrollY > 40)

      if (progressRef.current) {
        const pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0
        progressRef.current.style.width = `${pct}%`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const scrollTo = useCallback(
    (href: string) => {
      setMobileOpen(false)

      if (href.startsWith('/') && !href.startsWith('/#')) {
        router.push(href)
        return
      }

      const hash = href.startsWith('/#') ? href.slice(1) : href
      const el = document.querySelector(hash)
      if (!el) {
        router.push(href)
        return
      }

      const lenis = (window as any).lenis
      if (lenis) lenis.scrollTo(el, { offset: -68, duration: 1.2 })
      else el.scrollIntoView({ behavior: 'smooth' })
    },
    [router]
  )

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress fixed top-0 left-0 z-[201] h-[2px] bg-accent"
        ref={progressRef}
        style={{ width: 0, transition: 'width 0.08s linear' }}
      />

      {/* Main Sticky Navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -70, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
      >
        <div
          className="transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(250, 250, 247, 0.94)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
            boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.03)' : 'none',
          }}
        >
          <nav
            className="section-container flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? '56px' : '68px' }}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className="font-mono text-xs md:text-sm font-medium tracking-[0.14em] uppercase text-text-primary hover:text-accent transition-colors duration-200 select-none text-left"
              aria-label="Hafiz Muneeb Hassan - Home"
            >
              HAFIZ MUNEEB HASSAN
            </button>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-7 lg:gap-9 list-none" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="relative text-[11px] lg:text-xs font-mono tracking-[0.14em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-200 py-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Side: THEME + RESUME + LET'S TALK */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-[0.14em] uppercase text-text-secondary hover:text-text-primary transition-colors py-1.5 px-3 border border-border/80 hover:border-text-primary rounded"
              >
                <span>CV / RESUME</span>
                <span className="text-[10px]">↗</span>
              </a>
              <button
                onClick={() => scrollTo('#contact')}
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.14em] uppercase text-accent hover:text-text-primary transition-colors py-1.5 px-3 border border-accent/25 hover:border-text-primary rounded"
              >
                <span>LET&apos;S TALK</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>

            {/* Mobile Actions: ThemeToggle + Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="text-xs font-mono tracking-[0.14em] text-text-primary hover:text-accent transition-colors py-2 px-3 border border-border/80 rounded"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? 'CLOSE' : 'MENU'}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Clean Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileTrapRef}
            tabIndex={-1}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg-primary px-8 py-12 outline-none overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border/80">
                <span className="label-text text-accent font-mono">NAVIGATION</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-2 text-text-secondary hover:text-text-primary rounded-lg border border-border/60 hover:border-border transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <X size={16} />
                    <span>CLOSE</span>
                  </button>
                </div>
              </div>
              <ul className="space-y-6 list-none pt-8" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-left w-full text-2xl sm:text-3xl font-light tracking-tight text-text-primary hover:text-accent transition-colors"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-8 space-y-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 border border-border/80 text-text-primary font-mono text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:border-text-primary transition-colors"
              >
                <span>VIEW RESUME (PDF)</span>
                <span>↗</span>
              </a>
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full py-3.5 px-4 bg-text-primary text-white font-mono text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:bg-accent transition-colors"
              >
                <span>LET&apos;S TALK</span>
                <span>→</span>
              </button>
              <div className="text-xs font-mono text-text-muted text-center pt-2">
                LAHORE, PAKISTAN · AI/ML ENGINEER
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
