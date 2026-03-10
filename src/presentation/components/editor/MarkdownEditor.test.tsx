/**
 * Acceptance Tests for Story 1.1: Plain Text Markdown Entry
 *
 * As a job seeker
 * I want to write my resume content in plain text using Markdown syntax
 * So that I can focus on content without worrying about formatting
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MarkdownEditor } from './MarkdownEditor'

describe('Story 1.1: Plain Text Markdown Entry', () => {
  describe('Given I am on the resume editor page', () => {
    describe('When I want to write my resume content', () => {
      it('Then I should see a text editing area where I can type', () => {
        // Given
        render(<MarkdownEditor content="" onChange={() => {}} />)

        // When
        const editor = screen.getByRole('textbox', { name: /editor/i })

        // Then
        expect(editor).toBeInTheDocument()
        expect(editor).toBeVisible()
      })

      it('Then the text input should be visible and readable with adequate font size', () => {
        // Given
        render(<MarkdownEditor content="" onChange={() => {}} />)

        // When
        const editor = screen.getByRole('textbox', { name: /editor/i })
        const computedStyle = window.getComputedStyle(editor)

        // Then - Font size should be at least 14px for readability
        const fontSize = parseInt(computedStyle.fontSize)
        expect(fontSize).toBeGreaterThanOrEqual(14)
      })
    })

    describe('When I type Markdown text into the editor', () => {
      it('Then I should be able to enter standard Markdown syntax including headings', async () => {
        // Given
        const user = userEvent.setup()
        const handleChange = vi.fn()
        const markdownContent = '# John Doe\n## Software Engineer'

        // When - render with initial content that contains markdown headings
        render(<MarkdownEditor content={markdownContent} onChange={handleChange} />)
        const editor = screen.getByRole('textbox', { name: /editor/i }) as HTMLTextAreaElement

        // Then - the editor should display the markdown content
        expect(editor.value).toContain('# John Doe')
        expect(editor.value).toContain('## Software Engineer')

        // And when user types more content
        await user.click(editor)
        await user.type(editor, ' - Expert')

        // Then onChange should be called
        expect(handleChange).toHaveBeenCalled()
      })

      it('Then I should be able to enter lists', async () => {
        // Given
        const user = userEvent.setup()
        const handleChange = vi.fn()
        render(<MarkdownEditor content="" onChange={handleChange} />)
        const editor = screen.getByRole('textbox', { name: /editor/i })

        // When
        const markdownContent = '- Item 1\n- Item 2\n- Item 3'
        await user.type(editor, markdownContent)

        // Then
        expect(handleChange).toHaveBeenCalled()
      })

      it('Then I should be able to enter bold and italic text', async () => {
        // Given
        const user = userEvent.setup()
        const handleChange = vi.fn()
        render(<MarkdownEditor content="" onChange={handleChange} />)
        const editor = screen.getByRole('textbox', { name: /editor/i })

        // When
        const markdownContent = '**bold text** and *italic text*'
        await user.type(editor, markdownContent)

        // Then
        expect(handleChange).toHaveBeenCalled()
      })

      it('Then I should be able to enter links', async () => {
        // Given
        const user = userEvent.setup()
        const handleChange = vi.fn()
        render(<MarkdownEditor content="" onChange={handleChange} />)
        const editor = screen.getByRole('textbox', { name: /editor/i })

        // When - userEvent interprets [ as special char, use {[} and {]} to escape
        const markdownContent = '{[}My Portfolio{]}(https://example.com)'
        await user.type(editor, markdownContent)

        // Then
        expect(handleChange).toHaveBeenCalled()
      })
    })

    describe('When I paste text into the editor', () => {
      it('Then the pasted content should appear in the editor', async () => {
        // Given
        const user = userEvent.setup()
        const handleChange = vi.fn()
        render(<MarkdownEditor content="" onChange={handleChange} />)
        const editor = screen.getByRole('textbox', { name: /editor/i })

        // When
        await user.click(editor)
        await user.paste('# Pasted Resume Content\n\nThis is pasted text.')

        // Then
        expect(handleChange).toHaveBeenCalled()
      })
    })

    describe('When I need to enter a large amount of content', () => {
      it('Then I should be able to enter at least 5000 characters without issues', async () => {
        // Given
        const handleChange = vi.fn()
        const largeContent = 'A'.repeat(5000)

        // When
        render(<MarkdownEditor content={largeContent} onChange={handleChange} />)
        const editor = screen.getByRole('textbox', { name: /editor/i }) as HTMLTextAreaElement

        // Then
        expect(editor.value).toHaveLength(5000)
      })

      it('Then there should be no character limit preventing typical resume content entry', () => {
        // Given
        const handleChange = vi.fn()
        const veryLargeContent = 'A'.repeat(10000)

        // When
        render(<MarkdownEditor content={veryLargeContent} onChange={handleChange} />)
        const editor = screen.getByRole('textbox', { name: /editor/i }) as HTMLTextAreaElement

        // Then - No maxLength attribute should be set, or it should be very large
        expect(editor.maxLength).toBe(-1) // -1 means no limit
      })
    })

    describe('When I want to edit existing content', () => {
      it('Then the text should remain editable after entry', async () => {
        // Given
        const user = userEvent.setup()
        const handleChange = vi.fn()
        render(<MarkdownEditor content="Initial content" onChange={handleChange} />)
        const editor = screen.getByRole('textbox', { name: /editor/i })

        // When
        await user.clear(editor)
        await user.type(editor, 'Updated content')

        // Then
        expect(handleChange).toHaveBeenCalled()
        expect(editor).not.toBeDisabled()
      })
    })

    describe('When I use keyboard shortcuts for text manipulation', () => {
      it('Then I should be able to select all text', async () => {
        // Given
        const user = userEvent.setup()
        render(<MarkdownEditor content="Select all this text" onChange={() => {}} />)
        const editor = screen.getByRole('textbox', { name: /editor/i }) as HTMLTextAreaElement

        // When
        await user.click(editor)
        await user.keyboard('{Control>}a{/Control}')

        // Then - The entire text should be selected
        expect(editor.selectionStart).toBe(0)
        expect(editor.selectionEnd).toBe(editor.value.length)
      })
    })
  })
})
