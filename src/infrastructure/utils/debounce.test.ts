/**
 * Acceptance Tests for Story 9.1: Debounce Utility
 *
 * As a developer
 * I want a debounce utility
 * So that I can optimize expensive operations like auto-save
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from './debounce'

describe('Story 9.1: Debounce Utility', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Given a debounced function', () => {
    describe('When called multiple times in quick succession', () => {
      it('Then it should only execute once after the delay', () => {
        // Given
        const callback = vi.fn()
        const debouncedFn = debounce(callback, 100)

        // When
        debouncedFn()
        debouncedFn()
        debouncedFn()

        // Then - callback not called yet
        expect(callback).not.toHaveBeenCalled()

        // After delay, called exactly once
        vi.advanceTimersByTime(100)
        expect(callback).toHaveBeenCalledTimes(1)
      })

      it('Then it should use the arguments from the last call', () => {
        // Given
        const callback = vi.fn()
        const debouncedFn = debounce(callback, 100)

        // When
        debouncedFn('first')
        debouncedFn('second')
        debouncedFn('third')

        // Then
        vi.advanceTimersByTime(100)
        expect(callback).toHaveBeenCalledWith('third')
      })
    })

    describe('When called with sufficient delay between calls', () => {
      it('Then it should execute each time', () => {
        // Given
        const callback = vi.fn()
        const debouncedFn = debounce(callback, 100)

        // When
        debouncedFn()
        vi.advanceTimersByTime(100)

        debouncedFn()
        vi.advanceTimersByTime(100)

        // Then
        expect(callback).toHaveBeenCalledTimes(2)
      })
    })

    describe('When cancelled', () => {
      it('Then the pending execution should be cancelled', () => {
        // Given
        const callback = vi.fn()
        const debouncedFn = debounce(callback, 100)

        // When
        debouncedFn()
        debouncedFn.cancel()
        vi.advanceTimersByTime(100)

        // Then
        expect(callback).not.toHaveBeenCalled()
      })
    })
  })
})
