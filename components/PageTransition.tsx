'use client'

import { useEffect, useState } from 'react'

/**
 * A fast, elegant page-load overlay.
 * Fades out after the first render — gives the impression of
 * a deliberate, premium entrance instead of a raw paint.
 */
export function PageTransition() {
  const [visible, setVisible] = useState(true)
  const [done,    setDone]    = useState(false)

  useEffect(() => {
    // Slight delay so the browser has painted the content
    const t1 = setTimeout(() => setVisible(false), 200)
    // Remove from DOM after the CSS transition finishes
    const t2 = setTimeout(() => setDone(true),    900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (done) return null

  return (
    <div
      aria-hidden
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     1000,
        background: 'var(--color-bg-primary)',
        pointerEvents: 'none',
        opacity:    visible ? 1 : 0,
        transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1)',
      }}
    />
  )
}
