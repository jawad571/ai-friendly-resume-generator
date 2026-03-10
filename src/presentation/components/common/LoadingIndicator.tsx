/**
 * LoadingIndicator Component
 *
 * A reusable loading spinner with optional message.
 * Story 6.2: Loading Indicator
 */

import React from 'react'

interface LoadingIndicatorProps {
  isLoading: boolean
  message?: string
  size?: 'small' | 'medium' | 'large'
}

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8',
}

export function LoadingIndicator({
  isLoading,
  message,
  size = 'medium',
}: LoadingIndicatorProps): React.ReactElement | null {
  if (!isLoading) {
    return null
  }

  return (
    <div
      data-testid="loading-indicator"
      role="status"
      className={`flex items-center gap-2 ${size}`}
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}
      />
      {message && <span className="text-sm text-gray-600">{message}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
