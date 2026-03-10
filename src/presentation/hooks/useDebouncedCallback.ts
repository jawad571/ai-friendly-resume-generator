/**
 * useDebouncedCallback Hook
 *
 * A React hook that returns a debounced version of a callback function.
 * Story 9.3: Performance Optimization
 */

import { useCallback, useEffect, useRef } from 'react'

export interface DebouncedCallbackFunction<T extends (...args: unknown[]) => void> {
  (...args: Parameters<T>): void
  cancel: () => void
}

export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): DebouncedCallbackFunction<T> {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep the callback ref updated
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const cancel = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
        timeoutRef.current = null
      }, delay)
    },
    [delay]
  ) as DebouncedCallbackFunction<T>

  debouncedCallback.cancel = cancel

  return debouncedCallback
}
