/**
 * SkipLink Component
 *
 * Allows keyboard users to skip to main content.
 * Story 8.1: Skip Link
 */

import React from 'react'

interface SkipLinkProps {
  targetId: string
  children?: React.ReactNode
}

export function SkipLink({ targetId, children = 'Skip to main content' }: SkipLinkProps): React.ReactElement {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none"
    >
      {children}
    </a>
  )
}
