/**
 * Memoization Utility
 *
 * Creates a memoized version of a function that caches results
 * based on the arguments provided.
 * Story 9.2: Performance Optimization
 */

export interface MemoizedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>
  clear: () => void
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T
): MemoizedFunction<T> {
  const cache = new Map<string, ReturnType<T>>()

  const memoizedFn = (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn(...args) as ReturnType<T>
    cache.set(key, result)
    return result
  }

  memoizedFn.clear = (): void => {
    cache.clear()
  }

  return memoizedFn
}
