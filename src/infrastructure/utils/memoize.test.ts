/**
 * Acceptance Tests for Story 9.2: Memoization Utility
 *
 * As a developer
 * I want a memoization utility
 * So that I can cache expensive computations
 */

import { describe, it, expect, vi } from 'vitest'
import { memoize } from './memoize'

describe('Story 9.2: Memoization Utility', () => {
  describe('Given a memoized function', () => {
    describe('When called with the same arguments', () => {
      it('Then it should return cached result without recomputing', () => {
        // Given
        const expensiveFn = vi.fn((x: number) => x * 2)
        const memoizedFn = memoize(expensiveFn)

        // When
        const result1 = memoizedFn(5)
        const result2 = memoizedFn(5)
        const result3 = memoizedFn(5)

        // Then
        expect(result1).toBe(10)
        expect(result2).toBe(10)
        expect(result3).toBe(10)
        expect(expensiveFn).toHaveBeenCalledTimes(1)
      })
    })

    describe('When called with different arguments', () => {
      it('Then it should compute and cache each result separately', () => {
        // Given
        const expensiveFn = vi.fn((x: number) => x * 2)
        const memoizedFn = memoize(expensiveFn)

        // When
        const result1 = memoizedFn(5)
        const result2 = memoizedFn(10)
        const result3 = memoizedFn(5)

        // Then
        expect(result1).toBe(10)
        expect(result2).toBe(20)
        expect(result3).toBe(10)
        expect(expensiveFn).toHaveBeenCalledTimes(2) // Only 5 and 10
      })
    })

    describe('When called with multiple arguments', () => {
      it('Then it should cache based on all arguments', () => {
        // Given
        const addFn = vi.fn((a: number, b: number) => a + b)
        const memoizedAdd = memoize(addFn)

        // When
        const result1 = memoizedAdd(2, 3)
        const result2 = memoizedAdd(2, 3)
        const result3 = memoizedAdd(2, 4) // Different second arg

        // Then
        expect(result1).toBe(5)
        expect(result2).toBe(5)
        expect(result3).toBe(6)
        expect(addFn).toHaveBeenCalledTimes(2) // (2,3) and (2,4)
      })
    })

    describe('When cache is cleared', () => {
      it('Then it should recompute on next call', () => {
        // Given
        const expensiveFn = vi.fn((x: number) => x * 2)
        const memoizedFn = memoize(expensiveFn)

        // When
        memoizedFn(5)
        memoizedFn.clear()
        memoizedFn(5)

        // Then
        expect(expensiveFn).toHaveBeenCalledTimes(2)
      })
    })
  })
})
