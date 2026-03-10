/**
 * Acceptance Tests for Story 9.4: useMemoizedValue Hook
 *
 * As a React developer
 * I want a memoized value hook
 * So that I can cache expensive computations in components
 */

import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useMemoizedValue } from './useMemoizedValue'

describe('Story 9.4: useMemoizedValue Hook', () => {
  describe('Given the useMemoizedValue hook', () => {
    describe('When rendered with the same dependencies', () => {
      it('Then it should not recompute the value', () => {
        // Given
        const computeFn = vi.fn((x: number) => x * 2)
        const { rerender } = renderHook(
          ({ value }) => useMemoizedValue(() => computeFn(value), [value]),
          { initialProps: { value: 5 } }
        )

        // When - rerender with same value
        rerender({ value: 5 })
        rerender({ value: 5 })

        // Then
        expect(computeFn).toHaveBeenCalledTimes(1)
      })
    })

    describe('When rendered with different dependencies', () => {
      it('Then it should recompute the value', () => {
        // Given
        const computeFn = vi.fn((x: number) => x * 2)
        const { result, rerender } = renderHook(
          ({ value }) => useMemoizedValue(() => computeFn(value), [value]),
          { initialProps: { value: 5 } }
        )

        expect(result.current).toBe(10)

        // When - rerender with different value
        rerender({ value: 10 })

        // Then
        expect(result.current).toBe(20)
        expect(computeFn).toHaveBeenCalledTimes(2)
      })
    })

    describe('When the computation returns the computed value', () => {
      it('Then it should return the correct result', () => {
        // Given
        const { result } = renderHook(() =>
          useMemoizedValue(() => {
            return { name: 'John', age: 30 }
          }, [])
        )

        // Then
        expect(result.current).toEqual({ name: 'John', age: 30 })
      })
    })

    describe('When multiple dependencies change', () => {
      it('Then it should recompute only when any dependency changes', () => {
        // Given
        const computeFn = vi.fn((a: number, b: number) => a + b)
        const { result, rerender } = renderHook(
          ({ a, b }) => useMemoizedValue(() => computeFn(a, b), [a, b]),
          { initialProps: { a: 1, b: 2 } }
        )

        expect(result.current).toBe(3)
        expect(computeFn).toHaveBeenCalledTimes(1)

        // When - change first dependency
        rerender({ a: 2, b: 2 })
        expect(result.current).toBe(4)
        expect(computeFn).toHaveBeenCalledTimes(2)

        // When - change second dependency
        rerender({ a: 2, b: 3 })
        expect(result.current).toBe(5)
        expect(computeFn).toHaveBeenCalledTimes(3)

        // When - same values
        rerender({ a: 2, b: 3 })
        expect(result.current).toBe(5)
        expect(computeFn).toHaveBeenCalledTimes(3) // No recomputation
      })
    })
  })
})
