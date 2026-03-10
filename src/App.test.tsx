/**
 * Acceptance Tests for Story 2.3: Real-Time Preview Updates
 *
 * As a user
 * I want the preview to update automatically as I type
 * So that I can see changes immediately without manual refresh
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

describe('Story 2.3: Real-Time Preview Updates', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Given I am editing my resume in the editor', () => {
    describe('When I type in the editor', () => {
      it('Then the preview should update automatically', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        const preview = screen.getByRole('region', { name: /preview/i })

        // When - type content
        await user.type(editor, 'Hello World')

        // Then - preview should update
        await waitFor(() => {
          expect(preview).toHaveTextContent('Hello World')
        })
      })

      it('Then the update should occur within 500ms of stopping typing', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        const preview = screen.getByRole('region', { name: /preview/i })

        // When - type content
        await user.type(editor, 'Quick Update')

        // Advance time by debounce delay
        vi.advanceTimersByTime(500)

        // Then - preview should have updated within 500ms
        await waitFor(() => {
          expect(preview).toHaveTextContent('Quick Update')
        })
      })

      it('Then no manual refresh or button click should be required', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        const preview = screen.getByRole('region', { name: /preview/i })

        // When - just type, no other action
        await user.type(editor, 'Automatic Update')

        // Then - preview updates without clicking any button
        await waitFor(() => {
          expect(preview).toHaveTextContent('Automatic Update')
        })
      })
    })

    describe('When the preview reflects current editor state', () => {
      it('Then the preview should always reflect the current editor content', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        const preview = screen.getByRole('region', { name: /preview/i })

        // When - type multiple times
        await user.type(editor, 'First')
        await waitFor(() => {
          expect(preview).toHaveTextContent('First')
        })

        await user.type(editor, ' Second')
        await waitFor(() => {
          expect(preview).toHaveTextContent('First Second')
        })

        await user.type(editor, ' Third')
        await waitFor(() => {
          expect(preview).toHaveTextContent('First Second Third')
        })
      })
    })

    describe('When typing rapidly', () => {
      it('Then no error messages should appear during rapid typing', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        const consoleSpy = vi.spyOn(console, 'error')
        render(<App />)

        const editor = screen.getByRole('textbox', { name: /editor/i })

        // When - type rapidly
        await user.type(editor, 'RapidTypingTestWithManyCharacters')

        // Then - no errors
        expect(consoleSpy).not.toHaveBeenCalled()
        consoleSpy.mockRestore()
      })
    })
  })
})
