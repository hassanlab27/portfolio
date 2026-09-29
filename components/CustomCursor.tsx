'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only desktop with fine pointer and no reduced motion
    if (typeof window === 'undefined') return
    if (window.innerWidth < 1024) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setShow(true)

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100,
      mouseY = -100
    let ringX = -100,
      ringY = -100
    let rafId: number
    let isHoveringLink = false
    let isHoveringProject = false

    const tick = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15

      const halfSize = isHoveringProject ? 32 : isHoveringLink ? 22 : 16
      ring.style.transform = `translate(${ringX - halfSize}px, ${ringY - halfSize}px)`

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const projectEl = target.closest('[data-cursor="VIEW"]')
      if (projectEl) {
        isHoveringProject = true
        isHoveringLink = false
        ring.style.width = '64px'
        ring.style.height = '64px'
        ring.style.backgroundColor = 'var(--color-accent)'
        ring.style.borderColor = 'var(--color-accent)'
        ring.innerHTML = `<span style="font-size:8px;font-family:var(--font-mono);font-weight:600;letter-spacing:0.1em;color:#ffffff;line-height:1.1;text-align:center;display:block;">VIEW<br/>PROJECT</span>`
        dot.style.opacity = '0'
        return
      }

      const linkEl = target.closest('a, button, [role="button"]')
      if (linkEl) {
        isHoveringLink = true
        isHoveringProject = false
        ring.style.width = '44px'
        ring.style.height = '44px'
        ring.style.backgroundColor = 'transparent'
        ring.style.borderColor = 'var(--color-accent)'
        ring.innerHTML = ''
        dot.style.opacity = '1'
        return
      }

      // Default state
      isHoveringLink = false
      isHoveringProject = false
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.backgroundColor = 'transparent'
      ring.style.borderColor = 'var(--color-border)'
      ring.innerHTML = ''
      dot.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  if (!show) return null

  return (
    <>
      {/* Small Center Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-[6px] h-[6px] rounded-full bg-text-primary transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />

      {/* Subtle Outer Ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-[32px] h-[32px] rounded-full border border-text-primary/20 flex items-center justify-center transition-[width,height,border-color,background-color] duration-250 ease-out"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
