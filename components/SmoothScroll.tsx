'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

export interface LenisInstance {
  scrollTo: (target: string | number | HTMLElement | Element, options?: Record<string, unknown>) => void
  destroy: () => void
  on: (event: string, callback: (...args: unknown[]) => void) => void
  off: (event: string, callback: (...args: unknown[]) => void) => void
}

const LenisContext = createContext<LenisInstance | null>(null)

export function useLenis(): LenisInstance | null {
  return useContext(LenisContext)
}

/**
 * Initialises Lenis smooth scroll and wires it to GSAP ScrollTrigger
 * (if GSAP is available). Respects prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const initialised = useRef(false)
  const [instance, setInstance] = useState<LenisInstance | null>(null)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lenis: any = null

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis')

        lenis = new Lenis({
          duration:           1.15,
          easing:             (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation:        'vertical',
          gestureOrientation: 'vertical',
          smoothWheel:        true,
          touchMultiplier:    2,
        })

        setInstance(lenis)
        ;(window as any).lenis = lenis

        // Wire to GSAP ScrollTrigger if available
        try {
          const gsapModule = await import('gsap')
          const stModule   = await import('gsap/ScrollTrigger')
          const gsap       = gsapModule.default
          const { ScrollTrigger } = stModule

          gsap.registerPlugin(ScrollTrigger)

          lenis.on('scroll', ScrollTrigger.update)

          gsap.ticker.add((time: number) => {
            lenis.raf(time * 1000)
          })
          gsap.ticker.lagSmoothing(0)
        } catch {
          const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
          }
          requestAnimationFrame(raf)
        }
      } catch {
        // Native scroll fallback
      }
    }

    init()

    return () => {
      if (lenis) lenis.destroy()
      ;(window as any).lenis = null
      setInstance(null)
    }
  }, [])

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>
}
