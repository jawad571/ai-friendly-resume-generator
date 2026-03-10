/**
 * Acceptance Tests for Import/Export Integration in App
 *
 * Story 4.4/4.5: Import/Export Integration with Data Warning
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

describe('Story 4.4/4.5: Import/Export Integration', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.stubGlobal('prompt', vi.fn().mockReturnValue('Resume.pdf'))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  describe('Given the application is loaded', () => {
    describe('When the user views the header', () => {
      it('Then they should see import/export buttons', () => {
        // Given
        render(<App />)

        // Then
        expect(screen.getByRole('button', { name: /import.*markdown/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /export.*markdown/i })).toBeInTheDocument()
      })
    })
  })

  describe('Given the user has content in the editor', () => {
    describe('When they export as markdown', () => {
      it('Then the current content should be downloaded', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        const createObjectURL = vi.fn().mockReturnValue('blob:test')
        vi.stubGlobal('URL', { createObjectURL, revokeObjectURL: vi.fn() })

        render(<App />)

        // Dismiss welcome
        await user.click(screen.getByRole('button', { name: /get started/i }))

        // Type some content
        const editor = screen.getByRole('textbox', { name: /editor/i })
        await user.type(editor, '# Test Content')

        // When - export
        await user.click(screen.getByRole('button', { name: /export.*markdown/i }))

        // Then
        expect(createObjectURL).toHaveBeenCalled()
      })
    })
  })
})
