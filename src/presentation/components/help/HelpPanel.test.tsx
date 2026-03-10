/**
 * HelpPanel Component Tests
 *
 * Story 5.1: Access Schema Template
 * Story 5.2: Copy Schema to Clipboard
 * Story 5.3: View LLM Workflow Instructions
 * Story 6.4: View Schema Documentation
 * Story 6.5: View Example Resume
 *
 * Tests for the main help panel that contains all help-related content.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelpPanel } from './HelpPanel'

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

describe('Story 5.1: Access Schema Template - HelpPanel', () => {
  beforeEach(() => {
    mockWriteText.mockClear()
  })

  describe('Given a user wants to access the help panel', () => {
    describe('When the HelpPanel is rendered in open state', () => {
      it('Then it should display the help panel with tabs/sections', () => {
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        expect(screen.getByTestId('help-panel')).toBeInTheDocument()
      })

      it('Then it should have a Schema Template tab/section', () => {
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        expect(screen.getByRole('button', { name: /schema template/i })).toBeInTheDocument()
      })

      it('Then it should have an LLM Workflow tab/section', () => {
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        expect(screen.getByRole('button', { name: /workflow/i })).toBeInTheDocument()
      })

      it('Then it should have a Schema Documentation tab/section', () => {
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        expect(screen.getByRole('button', { name: /documentation/i })).toBeInTheDocument()
      })

      it('Then it should have an Example Resume tab/section', () => {
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        expect(screen.getByRole('button', { name: /example/i })).toBeInTheDocument()
      })
    })

    describe('When the user clicks on Schema Template tab', () => {
      it('Then it should display the schema template content', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const schemaTab = screen.getByRole('button', { name: /schema template/i })
        await user.click(schemaTab)

        expect(screen.getByTestId('schema-content')).toBeInTheDocument()
      })
    })

    describe('When the panel is closed', () => {
      it('Then it should not display the help panel content', () => {
        render(<HelpPanel isOpen={false} onClose={() => {}} />)

        expect(screen.queryByTestId('help-panel')).not.toBeInTheDocument()
      })
    })

    describe('When the user clicks the close button', () => {
      it('Then it should call the onClose callback', async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()
        render(<HelpPanel isOpen={true} onClose={onClose} />)

        const closeButton = screen.getByRole('button', { name: /close/i })
        await user.click(closeButton)

        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })
  })
})

describe('Story 5.2: Copy Schema to Clipboard - HelpPanel', () => {
  beforeEach(() => {
    mockWriteText.mockClear()
  })

  describe('Given a user is viewing the schema template', () => {
    describe('When they see the schema template section', () => {
      it('Then it should display a Copy Schema button', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const schemaTab = screen.getByRole('button', { name: /schema template/i })
        await user.click(schemaTab)

        expect(screen.getByRole('button', { name: /copy schema/i })).toBeInTheDocument()
      })
    })

    describe('When they click the Copy Schema button', () => {
      it('Then it should copy the schema to clipboard', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const schemaTab = screen.getByRole('button', { name: /schema template/i })
        await user.click(schemaTab)

        const copyButton = screen.getByRole('button', { name: /copy schema/i })
        await user.click(copyButton)

        // Wait for confirmation message to ensure clipboard API was called
        await waitFor(() => {
          expect(screen.getByText(/copied/i)).toBeInTheDocument()
        })

        expect(mockWriteText).toHaveBeenCalledTimes(1)
        // Should copy plain text containing schema sections
        expect(mockWriteText.mock.calls[0][0]).toContain('# John Doe')
      })

      it('Then it should show a confirmation message after copy', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

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

describe('Story 5.3: View LLM Workflow Instructions - HelpPanel', () => {
  describe('Given a user wants to understand the AI-friendly workflow', () => {
    describe('When they click on the Workflow tab', () => {
      it('Then it should display workflow instructions', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const workflowTab = screen.getByRole('button', { name: /workflow/i })
        await user.click(workflowTab)

        expect(screen.getByTestId('workflow-content')).toBeInTheDocument()
      })

      it('Then it should explain that the tool works WITH external LLMs', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const workflowTab = screen.getByRole('button', { name: /workflow/i })
        await user.click(workflowTab)

        const content = screen.getByTestId('workflow-content')
        expect(content.textContent).toMatch(/external|LLM|AI|ChatGPT|Claude/i)
      })

      it('Then it should show numbered workflow steps', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const workflowTab = screen.getByRole('button', { name: /workflow/i })
        await user.click(workflowTab)

        const content = screen.getByTestId('workflow-content')
        // Should have numbered steps
        expect(content.textContent).toMatch(/1\.|step 1/i)
        expect(content.textContent).toMatch(/2\.|step 2/i)
        expect(content.textContent).toMatch(/3\.|step 3/i)
      })

      it('Then it should mention compatible LLMs', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const workflowTab = screen.getByRole('button', { name: /workflow/i })
        await user.click(workflowTab)

        const content = screen.getByTestId('workflow-content')
        expect(content.textContent).toMatch(/ChatGPT|Claude|Gemini/i)
      })
    })
  })
})

describe('Story 6.4: View Schema Documentation - HelpPanel', () => {
  describe('Given a user wants to understand the resume schema structure', () => {
    describe('When they click on the Documentation tab', () => {
      it('Then it should display schema documentation', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const docsTab = screen.getByRole('button', { name: /documentation/i })
        await user.click(docsTab)

        expect(screen.getByTestId('documentation-content')).toBeInTheDocument()
      })

      it('Then it should list required sections', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const docsTab = screen.getByRole('button', { name: /documentation/i })
        await user.click(docsTab)

        const content = screen.getByTestId('documentation-content')
        expect(content.textContent).toMatch(/required/i)
      })

      it('Then it should list optional sections', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const docsTab = screen.getByRole('button', { name: /documentation/i })
        await user.click(docsTab)

        const content = screen.getByTestId('documentation-content')
        expect(content.textContent).toMatch(/optional/i)
      })

      it('Then it should explain the contact information section', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const docsTab = screen.getByRole('button', { name: /documentation/i })
        await user.click(docsTab)

        const content = screen.getByTestId('documentation-content')
        expect(content.textContent).toMatch(/contact|name|email/i)
      })
    })
  })
})

describe('Story 6.5: View Example Resume - HelpPanel', () => {
  beforeEach(() => {
    mockWriteText.mockClear()
  })

  describe('Given a user wants to see a complete example resume', () => {
    describe('When they click on the Example tab', () => {
      it('Then it should display example resume content', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const exampleTab = screen.getByRole('button', { name: /example/i })
        await user.click(exampleTab)

        expect(screen.getByTestId('example-content')).toBeInTheDocument()
      })

      it('Then it should include a complete Contact section', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const exampleTab = screen.getByRole('button', { name: /example/i })
        await user.click(exampleTab)

        const content = screen.getByTestId('example-content')
        expect(content.textContent).toContain('# Sarah Chen')
      })

      it('Then it should include an Experience section with realistic content', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const exampleTab = screen.getByRole('button', { name: /example/i })
        await user.click(exampleTab)

        const content = screen.getByTestId('example-content')
        expect(content.textContent).toContain('## Experience')
        // Should have realistic job details, not Lorem Ipsum
        expect(content.textContent).not.toContain('Lorem')
      })

      it('Then it should include an Education section', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const exampleTab = screen.getByRole('button', { name: /example/i })
        await user.click(exampleTab)

        const content = screen.getByTestId('example-content')
        expect(content.textContent).toContain('## Education')
      })

      it('Then it should include a Skills section', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const exampleTab = screen.getByRole('button', { name: /example/i })
        await user.click(exampleTab)

        const content = screen.getByTestId('example-content')
        expect(content.textContent).toContain('## Skills')
      })

      it('Then it should have a Copy Example button', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const exampleTab = screen.getByRole('button', { name: /example/i })
        await user.click(exampleTab)

        expect(screen.getByRole('button', { name: /copy example/i })).toBeInTheDocument()
      })

      it('Then clicking Copy Example should copy content to clipboard', async () => {
        const user = userEvent.setup()
        render(<HelpPanel isOpen={true} onClose={() => {}} />)

        const exampleTab = screen.getByRole('button', { name: /example/i })
        await user.click(exampleTab)

        const copyButton = screen.getByRole('button', { name: /copy example/i })
        await user.click(copyButton)

        expect(mockWriteText).toHaveBeenCalledTimes(1)
        expect(mockWriteText.mock.calls[0][0]).toContain('# Sarah Chen')
      })
    })
  })
})
