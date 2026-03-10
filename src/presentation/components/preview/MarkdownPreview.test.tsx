/**
 * Acceptance Tests for Story 2.2: Basic HTML Preview Rendering
 *
 * As a job seeker
 * I want to see my Markdown content rendered as formatted HTML
 * So that I can visualize how my resume will look
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MarkdownPreview } from './MarkdownPreview'

describe('Story 2.2: Basic HTML Preview Rendering', () => {
  describe('Given I have Markdown content in the editor', () => {
    describe('When the preview renders the content', () => {
      it('Then the right pane should display HTML-rendered version of Markdown content', () => {
        // Given
        const markdownContent = '# John Doe\n\nSoftware Engineer'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then
        const preview = screen.getByRole('region', { name: /preview/i })
        expect(preview).toBeInTheDocument()
        expect(preview.innerHTML).not.toBe(markdownContent) // Should be HTML, not raw markdown
      })

      it('Then Markdown headings should render as larger, bold text', () => {
        // Given
        const markdownContent = '# Main Heading\n## Subheading'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then
        const h1 = screen.getByRole('heading', { level: 1 })
        const h2 = screen.getByRole('heading', { level: 2 })

        expect(h1).toHaveTextContent('Main Heading')
        expect(h2).toHaveTextContent('Subheading')
      })

      it('Then Markdown lists should render as bulleted items', () => {
        // Given
        const markdownContent = '- Item 1\n- Item 2\n- Item 3'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then
        const listItems = screen.getAllByRole('listitem')
        expect(listItems).toHaveLength(3)
        expect(listItems[0]).toHaveTextContent('Item 1')
        expect(listItems[1]).toHaveTextContent('Item 2')
        expect(listItems[2]).toHaveTextContent('Item 3')
      })

      it('Then numbered lists should render correctly', () => {
        // Given
        const markdownContent = '1. First\n2. Second\n3. Third'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then
        const listItems = screen.getAllByRole('listitem')
        expect(listItems).toHaveLength(3)
      })

      it('Then bold text should render with correct styling', () => {
        // Given
        const markdownContent = 'This is **bold text** in a sentence'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then
        const boldElement = screen.getByText('bold text')
        expect(boldElement.tagName.toLowerCase()).toBe('strong')
      })

      it('Then italic text should render with correct styling', () => {
        // Given
        const markdownContent = 'This is *italic text* in a sentence'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then
        const italicElement = screen.getByText('italic text')
        expect(italicElement.tagName.toLowerCase()).toBe('em')
      })

      it('Then links should render as clickable anchors', () => {
        // Given
        const markdownContent = '[My Portfolio](https://example.com)'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then
        const link = screen.getByRole('link', { name: 'My Portfolio' })
        expect(link).toHaveAttribute('href', 'https://example.com')
      })
    })

    describe('When the content is readable and professional', () => {
      it('Then the rendered content should be readable with appropriate font and spacing', () => {
        // Given
        const markdownContent = '# Resume\n\nProfessional content here.'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then
        const preview = screen.getByRole('region', { name: /preview/i })
        expect(preview).toBeVisible()
        // The preview should have prose styling applied
        expect(preview.className).toMatch(/bg-white|template/)
      })
    })

    describe('When the editor is empty', () => {
      it('Then the preview should show empty or placeholder content', () => {
        // Given
        const emptyContent = ''

        // When
        render(<MarkdownPreview content={emptyContent} />)

        // Then
        const preview = screen.getByRole('region', { name: /preview/i })
        expect(preview).toBeInTheDocument()
      })
    })

    describe('When the preview is visually distinct from plain Markdown', () => {
      it('Then the content should clearly be formatted HTML, not raw Markdown text', () => {
        // Given
        const markdownContent = '# Title\n\n**Bold** and *italic*'

        // When
        render(<MarkdownPreview content={markdownContent} />)

        // Then - should not contain raw markdown syntax
        const preview = screen.getByRole('region', { name: /preview/i })
        expect(preview.textContent).not.toContain('# Title')
        expect(preview.textContent).not.toContain('**Bold**')
        expect(preview.textContent).not.toContain('*italic*')
      })
    })
  })
})
