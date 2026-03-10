/**
 * Acceptance Tests for Story 4.4: Import/Export Markdown
 *
 * As a job seeker
 * I want to import and export my resume as markdown
 * So that I can save my work and continue later
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ImportExportButtons } from './ImportExportButtons'

describe('Story 4.4: Import/Export Markdown', () => {
  const defaultProps = {
    content: '# My Resume',
    onImport: vi.fn(),
  }

  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given the import/export buttons exist', () => {
    describe('When the component renders', () => {
      it('Then it should display an export markdown button', () => {
        // Given
        render(<ImportExportButtons {...defaultProps} />)

        // Then
        expect(screen.getByRole('button', { name: /export.*markdown|save.*markdown|download.*md/i })).toBeInTheDocument()
      })

      it('Then it should display an import markdown button', () => {
        // Given
        render(<ImportExportButtons {...defaultProps} />)

        // Then
        expect(screen.getByRole('button', { name: /import.*markdown|load.*markdown|open.*md/i })).toBeInTheDocument()
      })
    })
  })

  describe('Given the user wants to export markdown', () => {
    describe('When they click the export button', () => {
      it('Then it should trigger a file download', async () => {
        // Given
        const createObjectURL = vi.fn().mockReturnValue('blob:test')
        const revokeObjectURL = vi.fn()
        vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })

        render(<ImportExportButtons {...defaultProps} content="# Test Resume" />)

        // When
        await user.click(screen.getByRole('button', { name: /export.*markdown|save.*markdown|download.*md/i }))

        // Then
        expect(createObjectURL).toHaveBeenCalled()
      })

      it('Then the file should contain the current content', async () => {
        // Given
        let blobContent = ''
        const createObjectURL = vi.fn().mockImplementation((blob: Blob) => {
          blob.text().then(text => { blobContent = text })
          return 'blob:test'
        })
        vi.stubGlobal('URL', { createObjectURL, revokeObjectURL: vi.fn() })

        render(<ImportExportButtons {...defaultProps} content="# Test Content" />)

        // When
        await user.click(screen.getByRole('button', { name: /export.*markdown|save.*markdown|download.*md/i }))

        // Then - wait for blob to be processed
        await vi.waitFor(() => {
          expect(blobContent).toBe('# Test Content')
        })
      })
    })
  })

  describe('Given the user wants to import markdown', () => {
    describe('When they click the import button', () => {
      it('Then it should open a file picker', async () => {
        // Given
        render(<ImportExportButtons {...defaultProps} />)

        // Then - there should be a file input
        const fileInput = document.querySelector('input[type="file"]')
        expect(fileInput).toBeInTheDocument()
      })

      it('Then it should accept .md files', async () => {
        // Given
        render(<ImportExportButtons {...defaultProps} />)

        // Then
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        expect(fileInput.accept).toContain('.md')
      })
    })

    describe('When a file is selected', () => {
      it('Then the content should be loaded into the editor', async () => {
        // Given
        const onImport = vi.fn()
        render(<ImportExportButtons {...defaultProps} onImport={onImport} />)

        // When - create a mock file and trigger input change
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        const file = new File(['# Imported Resume'], 'resume.md', { type: 'text/markdown' })

        await user.upload(fileInput, file)

        // Then
        await vi.waitFor(() => {
          expect(onImport).toHaveBeenCalledWith('# Imported Resume')
        })
      })
    })
  })
})

describe('Story 4.5: Data Loss Warning', () => {
  const defaultProps = {
    content: '# My Resume',
    onImport: vi.fn(),
    hasUnsavedChanges: true,
  }

  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given there are unsaved changes', () => {
    describe('When the user tries to import a new file', () => {
      it('Then they should be warned about losing current content', async () => {
        // Given
        const confirmSpy = vi.fn().mockReturnValue(true)
        vi.stubGlobal('confirm', confirmSpy)

        render(<ImportExportButtons {...defaultProps} hasUnsavedChanges={true} />)

        // When
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        const file = new File(['# New Content'], 'new.md', { type: 'text/markdown' })
        await user.upload(fileInput, file)

        // Then
        await vi.waitFor(() => {
          expect(confirmSpy).toHaveBeenCalledWith(expect.stringContaining('unsaved'))
        })
      })

      it('Then they should be able to cancel the import', async () => {
        // Given
        const confirmSpy = vi.fn().mockReturnValue(false) // User cancels
        vi.stubGlobal('confirm', confirmSpy)
        const onImport = vi.fn()

        render(<ImportExportButtons {...defaultProps} onImport={onImport} hasUnsavedChanges={true} />)

        // When
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        const file = new File(['# New Content'], 'new.md', { type: 'text/markdown' })
        await user.upload(fileInput, file)

        // Then - import should not proceed
        await vi.waitFor(() => {
          expect(confirmSpy).toHaveBeenCalled()
        })
        expect(onImport).not.toHaveBeenCalled()
      })
    })
  })

  describe('Given there are no unsaved changes', () => {
    describe('When the user imports a file', () => {
      it('Then no warning should be shown', async () => {
        // Given
        const confirmSpy = vi.fn().mockReturnValue(true)
        vi.stubGlobal('confirm', confirmSpy)
        const onImport = vi.fn()

        render(<ImportExportButtons {...defaultProps} onImport={onImport} hasUnsavedChanges={false} />)

        // When
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        const file = new File(['# New Content'], 'new.md', { type: 'text/markdown' })
        await user.upload(fileInput, file)

        // Then - no confirmation dialog
        expect(confirmSpy).not.toHaveBeenCalled()
        await vi.waitFor(() => {
          expect(onImport).toHaveBeenCalled()
        })
      })
    })
  })
})
