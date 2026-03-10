/**
 * Acceptance Tests for Story 3.8: Custom Filename Export
 *
 * As a job seeker
 * I want to specify a custom filename when exporting my resume
 * So that I can organize my files appropriately
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ExportButton } from './ExportButton'

describe('Story 3.8: Custom Filename Export', () => {
  const mockPrompt = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.prompt
    vi.stubGlobal('prompt', mockPrompt)
  })

  describe('Given I click the export button', () => {
    describe('When the export dialog appears', () => {
      it('Then I should be prompted for a filename', async () => {
        // Given
        const user = userEvent.setup()
        const onExport = vi.fn()
        mockPrompt.mockReturnValue('my-resume.pdf')
        render(<ExportButton onExport={onExport} />)

        // When
        await user.click(screen.getByRole('button', { name: /export.*pdf/i }))

        // Then
        expect(mockPrompt).toHaveBeenCalledWith(
          expect.stringContaining('filename'),
          expect.stringContaining('Resume')
        )
      })

      it('Then the default filename should be "Resume.pdf"', async () => {
        // Given
        const user = userEvent.setup()
        const onExport = vi.fn()
        mockPrompt.mockReturnValue('Resume.pdf')
        render(<ExportButton onExport={onExport} />)

        // When
        await user.click(screen.getByRole('button', { name: /export.*pdf/i }))

        // Then
        expect(mockPrompt).toHaveBeenCalledWith(
          expect.any(String),
          'Resume.pdf'
        )
      })
    })

    describe('When the user enters a custom filename', () => {
      it('Then the export should use the custom filename', async () => {
        // Given
        const user = userEvent.setup()
        const onExport = vi.fn()
        mockPrompt.mockReturnValue('John_Doe_Resume.pdf')
        render(<ExportButton onExport={onExport} />)

        // When
        await user.click(screen.getByRole('button', { name: /export.*pdf/i }))

        // Then
        expect(onExport).toHaveBeenCalledWith('John_Doe_Resume.pdf')
      })

      it('Then it should append .pdf extension if not provided', async () => {
        // Given
        const user = userEvent.setup()
        const onExport = vi.fn()
        mockPrompt.mockReturnValue('my-resume')
        render(<ExportButton onExport={onExport} />)

        // When
        await user.click(screen.getByRole('button', { name: /export.*pdf/i }))

        // Then
        expect(onExport).toHaveBeenCalledWith('my-resume.pdf')
      })
    })

    describe('When the user cancels the filename dialog', () => {
      it('Then the export should not proceed', async () => {
        // Given
        const user = userEvent.setup()
        const onExport = vi.fn()
        mockPrompt.mockReturnValue(null) // User cancelled
        render(<ExportButton onExport={onExport} />)

        // When
        await user.click(screen.getByRole('button', { name: /export.*pdf/i }))

        // Then
        expect(onExport).not.toHaveBeenCalled()
      })
    })

    describe('When the user enters an empty filename', () => {
      it('Then it should use the default filename', async () => {
        // Given
        const user = userEvent.setup()
        const onExport = vi.fn()
        mockPrompt.mockReturnValue('')
        render(<ExportButton onExport={onExport} />)

        // When
        await user.click(screen.getByRole('button', { name: /export.*pdf/i }))

        // Then
        expect(onExport).toHaveBeenCalledWith('Resume.pdf')
      })
    })
  })
})
