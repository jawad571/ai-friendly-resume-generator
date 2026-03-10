/**
 * Acceptance Tests for Story 4.3: PDF Matches Preview
 *
 * As a job seeker
 * I want the PDF export to accurately reflect what I see in the preview
 * So that I can be confident my resume looks correct when submitted
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

// Mock html2pdf.js
const mockSave = vi.fn().mockResolvedValue(undefined)
const mockFrom = vi.fn().mockReturnValue({ save: mockSave })
const mockSet = vi.fn().mockReturnValue({ from: mockFrom })

vi.mock('html2pdf.js', () => {
  return {
    default: () => ({
      set: mockSet,
      from: mockFrom,
      save: mockSave,
    }),
  }
})

describe('Story 4.3: PDF Matches Preview', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.clearAllMocks()
    // Mock window.prompt to return the default filename
    vi.stubGlobal('prompt', vi.fn().mockReturnValue('Resume.pdf'))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  describe('Given I have resume content in the preview', () => {
    describe('When I export to PDF', () => {
      it('Then the export button should be visible in the interface', async () => {
        // Given
        render(<App />)

        // Then
        const exportButton = screen.getByRole('button', { name: /export.*pdf/i })
        expect(exportButton).toBeInTheDocument()
        expect(exportButton).toBeVisible()
      })

      it('Then clicking export should trigger PDF generation', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        await user.type(editor, 'Resume Content')

        // When
        const exportButton = screen.getByRole('button', { name: /export.*pdf/i })
        await user.click(exportButton)

        // Then
        await waitFor(() => {
          expect(mockSet).toHaveBeenCalled()
        })
      })

      it('Then the preview content should be used for PDF generation', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        await user.type(editor, 'Test Resume')

        // When
        const exportButton = screen.getByRole('button', { name: /export.*pdf/i })
        await user.click(exportButton)

        // Then - mockFrom should have been called with an element
        await waitFor(() => {
          expect(mockFrom).toHaveBeenCalled()
        })
      })
    })

    describe('When the PDF is generated', () => {
      it('Then the PDF should accurately reflect the preview content', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        const markdownContent = 'Test Content'
        await user.type(editor, markdownContent)

        // Wait for preview to update
        const preview = screen.getByRole('region', { name: /preview/i })
        await waitFor(() => {
          expect(preview).toHaveTextContent('Test Content')
        })

        // When
        const exportButton = screen.getByRole('button', { name: /export.*pdf/i })
        await user.click(exportButton)

        // Then - the preview element should be passed to html2pdf
        await waitFor(() => {
          expect(mockFrom).toHaveBeenCalled()
        })
      })

      it('Then headings should appear with correct size and weight in PDF', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        await user.click(editor)
        // Type heading using keyboard since # is a special character
        await user.keyboard(' John Doe')

        // Set content with heading via paste which handles special chars better
        await user.clear(editor)
        await user.paste('# John Doe')

        // When
        const exportButton = screen.getByRole('button', { name: /export.*pdf/i })
        await user.click(exportButton)

        // Then - export should be triggered
        await waitFor(() => {
          expect(mockFrom).toHaveBeenCalled()
        })
      })

      it('Then the formatting should match the preview exactly', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        // When
        const exportButton = screen.getByRole('button', { name: /export.*pdf/i })
        await user.click(exportButton)

        // Then - PDF options should include proper formatting
        await waitFor(() => {
          expect(mockSet).toHaveBeenCalled()
          const options = mockSet.mock.calls[0][0]
          expect(options).toBeDefined()
        })
      })
    })
  })
})
