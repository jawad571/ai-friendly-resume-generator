/**
 * App Help Integration Tests
 *
 * Story 5.1: Access Schema Template
 * Story 5.2: Copy Schema to Clipboard
 * Story 5.3: View LLM Workflow Instructions
 * Story 6.4: View Schema Documentation
 * Story 6.5: View Example Resume
 *
 * Integration tests for help functionality within the main App.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock the clipboard API
const mockWriteText = vi.fn<(data: string) => Promise<void>>().mockResolvedValue(undefined)

beforeEach(() => {
  mockWriteText.mockClear()
  // jsdom doesn't have a real clipboard, so we need to define it
  if (!navigator.clipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      value: {},
      writable: true,
      configurable: true,
    })
  }
  Object.defineProperty(navigator.clipboard, 'writeText', {
    value: mockWriteText,
    writable: true,
    configurable: true,
  })
})

describe('Phase 2: AI-Assisted Workflow - App Integration', () => {
  beforeEach(() => {
    localStorage.clear()
    // Mark as visited to skip welcome message
    localStorage.setItem('resume:hasVisited', 'true')
  })

  describe('Story 5.1: Access Schema Template', () => {
    describe('Given a user is on the main application', () => {
      describe('When they look at the header/toolbar', () => {
        it('Then they should see a Help/Schema button', async () => {
          render(<App />)

          // Wait for app to load
          await waitFor(() => {
            expect(screen.getByRole('button', { name: /help|schema|guide/i })).toBeInTheDocument()
          })
        })
      })

      describe('When they click the Help button', () => {
        it('Then the help panel should open', async () => {
          const user = userEvent.setup()
          render(<App />)

          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          expect(screen.getByTestId('help-panel')).toBeInTheDocument()
        })

        it('Then they should be able to view the schema template', async () => {
          const user = userEvent.setup()
          render(<App />)

          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          // Click on schema tab
          const schemaTab = screen.getByRole('button', { name: /schema template/i })
          await user.click(schemaTab)

          expect(screen.getByTestId('schema-content')).toBeInTheDocument()
        })
      })

      describe('When viewing the schema template', () => {
        it('Then the current editor content should not be lost', async () => {
          const user = userEvent.setup()
          render(<App />)

          // Type some content
          const editor = screen.getByRole('textbox', { name: /editor/i })
          await user.type(editor, '# My Resume Content')

          // Open help panel
          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          // Close help panel
          const closeButton = screen.getByRole('button', { name: /close/i })
          await user.click(closeButton)

          // Content should still be there
          expect(editor).toHaveValue('# My Resume Content')
        })
      })
    })
  })

  describe('Story 5.2: Copy Schema to Clipboard', () => {
    describe('Given the help panel is open with schema template visible', () => {
      describe('When the user clicks Copy Schema button', () => {
        it('Then the schema should be copied to clipboard', async () => {
          const user = userEvent.setup()
          render(<App />)

          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          const schemaTab = screen.getByRole('button', { name: /schema template/i })
          await user.click(schemaTab)

          const copyButton = screen.getByRole('button', { name: /copy schema/i })
          await user.click(copyButton)

          expect(mockWriteText).toHaveBeenCalledTimes(1)
          expect(mockWriteText.mock.calls[0][0]).toContain('# John Doe')
        })

        it('Then a confirmation message should appear', async () => {
          const user = userEvent.setup()
          render(<App />)

          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          const schemaTab = screen.getByRole('button', { name: /schema template/i })
          await user.click(schemaTab)

          const copyButton = screen.getByRole('button', { name: /copy schema/i })
          await user.click(copyButton)

          await waitFor(() => {
            expect(screen.getByText(/copied/i)).toBeInTheDocument()
          })
        })
      })
    })
  })

  describe('Story 5.3: View LLM Workflow Instructions', () => {
    describe('Given the help panel is open', () => {
      describe('When the user views the workflow section', () => {
        it('Then they should see numbered workflow steps', async () => {
          const user = userEvent.setup()
          render(<App />)

          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          const workflowTab = screen.getByRole('button', { name: /workflow/i })
          await user.click(workflowTab)

          const content = screen.getByTestId('workflow-content')
          expect(content.textContent).toMatch(/1\.|step 1/i)
        })
      })
    })
  })

  describe('Story 5.5: Paste Large Content Blocks', () => {
    describe('Given the editor is ready', () => {
      describe('When the user pastes 5000+ characters', () => {
        it('Then the content should appear in the editor', async () => {
          render(<App />)

          const editor = screen.getByRole('textbox', { name: /editor/i })

          // Generate large content
          const largeContent = 'A'.repeat(5500)

          // Simulate paste by changing value
          editor.focus()
          await userEvent.clear(editor)

          // Use fireEvent for large paste simulation
          const { fireEvent } = await import('@testing-library/react')
          fireEvent.change(editor, { target: { value: largeContent } })

          await waitFor(() => {
            expect((editor as HTMLTextAreaElement).value.length).toBeGreaterThanOrEqual(5000)
          })
        })

        it('Then the preview should update to show the content', async () => {
          render(<App />)

          const editor = screen.getByRole('textbox', { name: /editor/i })
          const largeContent = '# Large Resume\n\n' + 'Content paragraph. '.repeat(300)

          const { fireEvent } = await import('@testing-library/react')
          fireEvent.change(editor, { target: { value: largeContent } })

          await waitFor(() => {
            const preview = screen.getByTestId('preview')
            expect(preview.textContent).toContain('Large Resume')
          })
        })
      })
    })
  })

  describe('Story 6.4: View Schema Documentation', () => {
    describe('Given the help panel is open', () => {
      describe('When the user views the documentation section', () => {
        it('Then they should see required vs optional sections', async () => {
          const user = userEvent.setup()
          render(<App />)

          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          const docsTab = screen.getByRole('button', { name: /documentation/i })
          await user.click(docsTab)

          const content = screen.getByTestId('documentation-content')
          expect(content.textContent).toMatch(/required/i)
          expect(content.textContent).toMatch(/optional/i)
        })
      })
    })
  })

  describe('Story 6.5: View Example Resume', () => {
    describe('Given the help panel is open', () => {
      describe('When the user views the example resume', () => {
        it('Then they should see a complete realistic resume', async () => {
          const user = userEvent.setup()
          render(<App />)

          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          const exampleTab = screen.getByRole('button', { name: /example/i })
          await user.click(exampleTab)

          const content = screen.getByTestId('example-content')
          expect(content.textContent).toContain('# Sarah Chen')
          expect(content.textContent).toContain('## Experience')
          expect(content.textContent).toContain('## Education')
          expect(content.textContent).toContain('## Skills')
        })

        it('Then they should be able to copy the example', async () => {
          const user = userEvent.setup()
          render(<App />)

          const helpButton = await screen.findByRole('button', { name: /help|schema|guide/i })
          await user.click(helpButton)

          const exampleTab = screen.getByRole('button', { name: /example/i })
          await user.click(exampleTab)

          const copyButton = screen.getByRole('button', { name: /copy example/i })
          await user.click(copyButton)

          expect(mockWriteText).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})
