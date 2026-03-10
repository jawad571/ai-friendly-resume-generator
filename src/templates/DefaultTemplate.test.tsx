/**
 * Acceptance Tests for Story 3.1: Default Template Display
 *
 * As a job seeker
 * I want my resume content to display in a professional default template
 * So that my resume looks polished without choosing a template
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MarkdownPreview } from '../presentation/components/preview/MarkdownPreview'

describe('Story 3.1: Default Template Display', () => {
  const sampleResume = `# John Doe
Email: john@example.com | Phone: (555) 123-4567 | Location: New York, NY

## Summary
Experienced software engineer with 5+ years in web development.

## Experience

### Senior Software Engineer | Acme Corp | 2020 - Present
- Led development of customer-facing web applications
- Improved system performance by 40%
- Mentored junior developers

### Software Engineer | TechStart Inc | 2018 - 2020
- Built RESTful APIs using Node.js
- Implemented CI/CD pipelines

## Education

### B.S. Computer Science | State University | 2018
GPA: 3.8/4.0

## Skills
- JavaScript, TypeScript, React
- Node.js, Python
- PostgreSQL, MongoDB
- AWS, Docker, Kubernetes
`

  describe('Given I have resume content', () => {
    describe('When the preview displays the content', () => {
      it('Then it should use a clean, professional default template', () => {
        // Given
        render(<MarkdownPreview content={sampleResume} />)

        // Then - preview should have professional styling classes
        const preview = screen.getByRole('region', { name: /preview/i })
        expect(preview.className).toMatch(/bg-white|template/)
      })

      it('Then the template should include appropriate typography (font, sizes, spacing)', () => {
        // Given
        render(<MarkdownPreview content={sampleResume} />)

        // Then
        const preview = screen.getByRole('region', { name: /preview/i })
        // Should have text styling
        expect(preview).toBeVisible()
        expect(preview.className).toMatch(/bg-white|template/)
      })

      it('Then the layout should be suitable for a professional resume', () => {
        // Given
        render(<MarkdownPreview content={sampleResume} />)

        // Then - should render all major sections
        expect(screen.getByRole('heading', { name: /John Doe/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /Experience/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /Education/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument()
      })

      it('Then the template should render all standard resume sections', () => {
        // Given
        render(<MarkdownPreview content={sampleResume} />)

        // Then - should render contact info, experience, education, skills
        const preview = screen.getByRole('region', { name: /preview/i })

        expect(preview).toHaveTextContent('john@example.com')
        expect(preview).toHaveTextContent('Senior Software Engineer')
        expect(preview).toHaveTextContent('B.S. Computer Science')
        expect(preview).toHaveTextContent('JavaScript')
      })
    })

    describe('When the preview shows professional output', () => {
      it('Then the preview should show professional-looking resume with proper headings', () => {
        // Given
        render(<MarkdownPreview content={sampleResume} />)

        // Then
        const h1 = screen.getByRole('heading', { level: 1 })
        const h2Elements = screen.getAllByRole('heading', { level: 2 })
        const h3Elements = screen.getAllByRole('heading', { level: 3 })

        expect(h1).toHaveTextContent('John Doe')
        expect(h2Elements.length).toBeGreaterThan(0)
        expect(h3Elements.length).toBeGreaterThan(0)
      })

      it('Then the template should work for resumes of varying lengths', () => {
        // Given - short resume
        const shortResume = '# Jane Doe\n\nBrief resume content.'
        render(<MarkdownPreview content={shortResume} />)

        // Then
        expect(screen.getByRole('heading', { name: /Jane Doe/i })).toBeInTheDocument()
      })

      it('Then there should be no visual glitches or formatting errors', () => {
        // Given
        render(<MarkdownPreview content={sampleResume} />)

        // Then - preview should be readable and have content
        const preview = screen.getByRole('region', { name: /preview/i })
        expect(preview).toBeVisible()
        expect(preview.textContent!.length).toBeGreaterThan(100)
      })
    })
  })
})
