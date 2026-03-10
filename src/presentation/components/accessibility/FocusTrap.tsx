/**
 * FocusTrap Component
 *
 * Traps focus within a container for modal dialogs and menus.
 * Story 8.2: Keyboard Navigation
 */

import React, { useRef, useEffect, useCallback } from 'react'

interface FocusTrapProps {
  children: React.ReactNode
  isActive: boolean
  onEscape?: () => void
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelector =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
}

export function FocusTrap({ children, isActive, onEscape }: FocusTrapProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive || !containerRef.current) return

    if (event.key === 'Escape' && onEscape) {
      onEscape()
      return
    }

    if (event.key !== 'Tab') return

    const focusableElements = getFocusableElements(containerRef.current)
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }, [isActive, onEscape])

  useEffect(() => {
    if (!isActive) return

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive, handleKeyDown])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
