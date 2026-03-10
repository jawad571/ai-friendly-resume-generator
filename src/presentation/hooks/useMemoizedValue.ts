/**
 * useMemoizedValue Hook
 *
 * A React hook that memoizes an expensive computation based on dependencies.
 * Similar to useMemo but with a clearer API.
 * Story 9.4: Performance Optimization
 */

import { useMemo } from 'react'; import type { DependencyList } from 'react'

export function useMemoizedValue<T>(
  computeFn: () => T,
  deps: DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(computeFn, deps)
}
