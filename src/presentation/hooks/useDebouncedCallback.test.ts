/**
 * Acceptance Tests for Story 9.3: useDebouncedCallback Hook
 *
 * As a React developer
 * I want a debounced callback hook
 * So that I can easily debounce operations in components
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDebouncedCallback } from './useDebouncedCallback'

describe('Story 9.3: useDebouncedCallback Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Given the useDebouncedCallback hook', () => {
    describe('When the debounced callback is called multiple times', () => {
      it('Then it should only execute once after the delay', () => {
        // Given
        const callback = vi.fn()
        const { result } = renderHook(() => useDebouncedCallback(callback, 100))

        // When
        act(() => {
          result.current('first')
          result.current('second')
          result.current('third')
        })

        // Then - not called yet
        expect(callback).not.toHaveBeenCalled()

        // After delay
        act(() => {
          vi.advanceTimersByTime(100)
        })

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledWith('third')
      })
    })

    describe('When the callback changes', () => {
      it('Then it should use the latest callback', () => {
        // Given
        const callback1 = vi.fn()
        const callback2 = vi.fn()
        const { result, rerender } = renderHook(
          ({ cb }) => useDebouncedCallback(cb, 100),
          { initialProps: { cb: callback1 } }
        )

        // When
        act(() => {
          result.current('test')
        })

        // Change callback before delay completes
        rerender({ cb: callback2 })

        act(() => {
          vi.advanceTimersByTime(100)
        })

        // Then - should call the latest callback
        expect(callback1).not.toHaveBeenCalled()
        expect(callback2).toHaveBeenCalledWith('test')
      })
    })

    describe('When the component unmounts', () => {
      it('Then pending executions should be cancelled', () => {
        // Given
        const callback = vi.fn()
        const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 100))

        // When
        act(() => {
          result.current('test')
        })

        unmount()

        act(() => {
          vi.advanceTimersByTime(100)
        })

        // Then
        expect(callback).not.toHaveBeenCalled()
      })
    })

    describe('When cancel is called', () => {
      it('Then pending executions should be cancelled', () => {
        // Given
        const callback = vi.fn()
        const { result } = renderHook(() => useDebouncedCallback(callback, 100))

        // When
        act(() => {
          result.current('test')
          result.current.cancel()
        })

        act(() => {
          vi.advanceTimersByTime(100)
        })

        // Then
        expect(callback).not.toHaveBeenCalled()
      })
    })
  })
})
