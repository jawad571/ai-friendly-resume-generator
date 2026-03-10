/**
 * Acceptance Tests for Story 5.2: Validation Error Display
 *
 * As a job seeker
 * I want to see validation errors and warnings clearly
 * So that I can fix issues with my resume format
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ValidationDisplay } from './ValidationDisplay'
import type { ValidationResult } from '../../../domain/validation/ResumeValidator'

describe('Story 5.2: Validation Error Display', () => {
  describe('Given a valid resume with no errors or warnings', () => {
    const validResult: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    }

    describe('When the validation display renders', () => {
      it('Then it should show a success indicator', () => {
        // Given
        render(<ValidationDisplay result={validResult} />)

        // Then
        expect(screen.getByText(/valid|looks good|no issues/i)).toBeInTheDocument()
      })

      it('Then it should not show any error messages', () => {
        // Given
        render(<ValidationDisplay result={validResult} />)

        // Then
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })

  describe('Given a resume with errors', () => {
    const resultWithErrors: ValidationResult = {
      isValid: false,
      errors: [
        { type: 'error', message: 'Missing name/title heading' },
        { type: 'error', message: 'Resume content is empty' },
      ],
      warnings: [],
    }

    describe('When the validation display renders', () => {
      it('Then it should display all error messages', () => {
        // Given
        render(<ValidationDisplay result={resultWithErrors} />)

        // Then
        expect(screen.getByText(/missing name/i)).toBeInTheDocument()
        expect(screen.getByText(/empty/i)).toBeInTheDocument()
      })

      it('Then errors should be visually distinct (red/warning color)', () => {
        // Given
        render(<ValidationDisplay result={resultWithErrors} />)

        // Then - should have error styling
        const errorContainer = screen.getByTestId('validation-errors')
        expect(errorContainer.className).toMatch(/red|error|danger/)
      })
    })
  })

  describe('Given a resume with warnings', () => {
    const resultWithWarnings: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [
        { type: 'warning', message: 'Consider adding an Education section' },
        { type: 'warning', message: 'Missing Skills section' },
      ],
    }

    describe('When the validation display renders', () => {
      it('Then it should display all warning messages', () => {
        // Given
        render(<ValidationDisplay result={resultWithWarnings} />)

        // Then
        expect(screen.getByText(/education/i)).toBeInTheDocument()
        expect(screen.getByText(/skills/i)).toBeInTheDocument()
      })

      it('Then warnings should be visually distinct (yellow/warning color)', () => {
        // Given
        render(<ValidationDisplay result={resultWithWarnings} />)

        // Then - should have warning styling
        const warningContainer = screen.getByTestId('validation-warnings')
        expect(warningContainer.className).toMatch(/yellow|warning|amber/)
      })
    })
  })

  describe('Given a resume with both errors and warnings', () => {
    const mixedResult: ValidationResult = {
      isValid: false,
      errors: [{ type: 'error', message: 'Critical error message' }],
      warnings: [{ type: 'warning', message: 'Warning message' }],
    }

    describe('When the validation display renders', () => {
      it('Then it should show both errors and warnings', () => {
        // Given
        render(<ValidationDisplay result={mixedResult} />)

        // Then
        expect(screen.getByText(/critical error/i)).toBeInTheDocument()
        expect(screen.getByText(/warning message/i)).toBeInTheDocument()
      })
    })
  })

  describe('Given no validation result provided', () => {
    describe('When the validation display renders', () => {
      it('Then it should show nothing or a placeholder', () => {
        // Given
        render(<ValidationDisplay result={null} />)

        // Then - should render empty or placeholder
        expect(screen.queryByTestId('validation-errors')).not.toBeInTheDocument()
        expect(screen.queryByTestId('validation-warnings')).not.toBeInTheDocument()
      })
    })
  })
})
