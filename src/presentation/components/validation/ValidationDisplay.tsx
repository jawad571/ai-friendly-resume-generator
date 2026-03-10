/**
 * ValidationDisplay Component
 *
 * Displays validation errors and warnings for resume content.
 * Story 5.2: Validation Error Display
 */

import React from 'react'
import type { ValidationResult } from '../../../domain/validation/ResumeValidator'

interface ValidationDisplayProps {
  result: ValidationResult | null
}

export function ValidationDisplay({ result }: ValidationDisplayProps): React.ReactElement | null {
  if (!result) {
    return null
  }

  const { isValid, errors, warnings } = result

  // If valid and no warnings, show success
  if (isValid && warnings.length === 0) {
    return (
      <div className="p-2 text-sm text-green-700 bg-green-50 rounded">
        Resume looks good! No issues found.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {errors.length > 0 && (
        <div
          data-testid="validation-errors"
          className="p-3 bg-red-50 border border-red-200 rounded"
          role="alert"
        >
          <h4 className="font-semibold text-red-800 mb-1">Errors</h4>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div
          data-testid="validation-warnings"
          className="p-3 bg-yellow-50 border border-yellow-200 rounded"
        >
          <h4 className="font-semibold text-yellow-800 mb-1">Suggestions</h4>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            {warnings.map((warning, index) => (
              <li key={index}>{warning.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
