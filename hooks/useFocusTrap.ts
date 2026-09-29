import { useEffect, useRef } from 'react'

export function useFocusTrap(isActive: boolean, onEscape?: () => void) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive) return

    // Store the previously focused element to return focus when closed
    if (typeof document !== 'undefined') {
      previousFocusRef.current = document.activeElement as HTMLElement
    }

    const container = containerRef.current
    if (!container) return

    const getFocusables = () => {
      const selectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ]
      return Array.from(
        container.querySelectorAll<HTMLElement>(selectors.join(','))
      ).filter((el) => el.offsetParent !== null)
    }

    // Set initial focus to the first focusable element
    const focusables = getFocusables()
    if (focusables.length > 0) {
      focusables[0].focus()
    } else {
      container.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onEscape) {
          e.preventDefault()
          onEscape()
        }
        return
      }

      if (e.key === 'Tab') {
        const elements = getFocusables()
        if (elements.length === 0) {
          e.preventDefault()
          return
        }

        const first = elements[0]
        const last = elements[elements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first || !container.contains(document.activeElement)) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last || !container.contains(document.activeElement)) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus()
      }
    }
  }, [isActive, onEscape])

  return containerRef
}
