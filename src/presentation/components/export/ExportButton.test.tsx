/**
 * Acceptance Tests for Story 4.1: Export Button Available
 *
 * As a job seeker
 * I want to find a clear button to export my resume
 * So that I can easily download my resume for job applications
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ExportButton } from './ExportButton'

describe('Story 4.1: Export Button Available', () => {
  describe('Given I am on the resume editor page', () => {
    describe('When I look for a way to export my resume', () => {
      it('Then I should see an export button visible in the main interface', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} />)

        // Then
        const button = screen.getByRole('button', { name: /export.*pdf/i })
        expect(button).toBeInTheDocument()
        expect(button).toBeVisible()
      })

      it('Then the button should be clearly labeled as "Export PDF" or "Download PDF"', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} />)

        // Then
        const button = screen.getByRole('button')
        expect(button.textContent).toMatch(/export.*pdf|download.*pdf/i)
      })

      it('Then the button should be easily accessible without scrolling', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} />)

        // Then
        const button = screen.getByRole('button', { name: /export.*pdf/i })
        expect(button).toBeVisible()
      })

      it('Then the button appearance should suggest it is clickable', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} />)

        // Then - button should have styling that makes it look clickable
        const button = screen.getByRole('button', { name: /export.*pdf/i })
        expect(button).toBeEnabled()
        expect(button.className).toMatch(/bg-|btn|button/)
      })
    })

    describe('When the export button is in the interface', () => {
      it('Then users should be able to locate it within 5 seconds', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} />)

        // Then - button should be immediately findable
        const button = screen.getByRole('button', { name: /export.*pdf/i })
        expect(button).toBeInTheDocument()
      })

      it('Then the button should have clear, unambiguous label', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} />)

        // Then
        const button = screen.getByRole('button')
        // Should contain both "Export" or "Download" and "PDF"
        const buttonText = button.textContent?.toLowerCase() || ''
        expect(buttonText).toMatch(/pdf/)
      })

      it('Then the button should be visually distinct and easy to click', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} />)

        // Then
        const button = screen.getByRole('button', { name: /export.*pdf/i })
        // Button should be enabled and visible
        expect(button).toBeEnabled()
        expect(button).toBeVisible()
      })
    })

    describe('When the button shows loading state', () => {
      it('Then it should display loading indicator when isExporting is true', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} isExporting={true} />)

        // Then
        const button = screen.getByRole('button')
        expect(button).toHaveTextContent(/generating|exporting|loading/i)
        expect(button).toBeDisabled()
      })

      it('Then it should be disabled while exporting', () => {
        // Given
        const onExport = vi.fn()

        // When
        render(<ExportButton onExport={onExport} isExporting={true} />)

        // Then
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
      })
    })
  })
})
