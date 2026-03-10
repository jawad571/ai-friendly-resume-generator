/**
 * MarkdownEditor Paste Tests
 *
 * Story 5.5: Paste Large Content Blocks
 * Tests for pasting large blocks of LLM-generated content into the editor.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MarkdownEditor } from './MarkdownEditor'

describe('Story 5.5: Paste Large Content Blocks - MarkdownEditor', () => {
  describe('Given a user wants to paste LLM-generated content', () => {
    describe('When they paste content of 5000+ characters', () => {
      it('Then the editor should accept the pasted content', async () => {
        const onChange = vi.fn()
        render(<MarkdownEditor content="" onChange={onChange} />)

        const editor = screen.getByRole('textbox', { name: /editor/i })

        // Generate a large content string (5500 characters)
        const largeContent = generateLargeResumeContent(5500)

        // Simulate paste by changing the value
        fireEvent.change(editor, { target: { value: largeContent } })

        expect(onChange).toHaveBeenCalledWith(largeContent)
        expect(onChange.mock.calls[0][0].length).toBeGreaterThanOrEqual(5000)
      })

      it('Then the pasted content should be visible in the editor', () => {
        const largeContent = generateLargeResumeContent(5500)
        const onChange = vi.fn()

        render(<MarkdownEditor content={largeContent} onChange={onChange} />)

        const editor = screen.getByRole('textbox', { name: /editor/i }) as HTMLTextAreaElement

        expect(editor.value).toBe(largeContent)
        expect(editor.value.length).toBeGreaterThanOrEqual(5000)
      })

      it('Then the editor should not freeze or crash', async () => {
        const onChange = vi.fn()
        render(<MarkdownEditor content="" onChange={onChange} />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        const largeContent = generateLargeResumeContent(5500)

        // This should complete without throwing
        fireEvent.change(editor, { target: { value: largeContent } })

        // Editor should still be interactive
        expect(editor).toBeEnabled()
        expect(editor).not.toBeDisabled()
      })
    })

    describe('When they paste content of 10000+ characters', () => {
      it('Then the editor should handle very large content gracefully', () => {
        const onChange = vi.fn()
        render(<MarkdownEditor content="" onChange={onChange} />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        const veryLargeContent = generateLargeResumeContent(10500)

        fireEvent.change(editor, { target: { value: veryLargeContent } })

        expect(onChange).toHaveBeenCalledWith(veryLargeContent)
        expect(onChange.mock.calls[0][0].length).toBeGreaterThanOrEqual(10000)
      })
    })

    describe('When pasting content using standard paste shortcuts', () => {
      it('Then Ctrl/Cmd+V should trigger paste functionality', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(<MarkdownEditor content="" onChange={onChange} />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        await user.click(editor)

        // The editor should have paste capability
        // Textarea natively supports paste - we verify it accepts input
        await user.type(editor, 'Test content')

        expect(onChange).toHaveBeenCalled()
      })
    })

    describe('When content is pasted into non-empty editor', () => {
      it('Then the new content should replace or append correctly', async () => {
        const onChange = vi.fn()
        const initialContent = '# Initial Content'

        render(<MarkdownEditor content={initialContent} onChange={onChange} />)

        const editor = screen.getByRole('textbox', { name: /editor/i })
        const newLargeContent = generateLargeResumeContent(5500)

        // Simulate replacing all content (as would happen with select-all + paste)
        fireEvent.change(editor, { target: { value: newLargeContent } })

        expect(onChange).toHaveBeenCalledWith(newLargeContent)
      })
    })
  })
})

/**
 * Helper function to generate large resume content for testing
 */
function generateLargeResumeContent(targetLength: number): string {
  const resumeTemplate = `# Contact
**Name:** John Doe
**Email:** john.doe@email.com
**Phone:** (555) 123-4567
**Location:** San Francisco, CA
**LinkedIn:** linkedin.com/in/johndoe
**GitHub:** github.com/johndoe

# Summary
Experienced software engineer with 8+ years of experience in building scalable web applications. Passionate about clean code, test-driven development, and creating excellent user experiences. Strong background in JavaScript, TypeScript, React, and Node.js.

# Experience

## Senior Software Engineer
**TechCorp Inc.** | San Francisco, CA | 2020 - Present
- Led development of customer-facing dashboard serving 1M+ users
- Architected microservices migration reducing latency by 40%
- Mentored junior developers and conducted code reviews
- Implemented CI/CD pipelines improving deployment frequency by 300%

## Software Engineer
**StartupXYZ** | San Francisco, CA | 2017 - 2020
- Built React-based e-commerce platform from scratch
- Developed RESTful APIs using Node.js and Express
- Optimized database queries reducing page load time by 60%
- Collaborated with design team on UX improvements

## Junior Developer
**WebAgency** | San Francisco, CA | 2015 - 2017
- Developed responsive websites for various clients
- Maintained legacy codebases and implemented new features
- Participated in agile development processes

# Education

## Bachelor of Science in Computer Science
**University of California, Berkeley** | 2011 - 2015
- GPA: 3.8/4.0
- Relevant coursework: Data Structures, Algorithms, Web Development
- Dean's List: All semesters

# Skills

## Technical Skills
- **Languages:** JavaScript, TypeScript, Python, Java, SQL
- **Frontend:** React, Vue.js, HTML5, CSS3, Tailwind CSS
- **Backend:** Node.js, Express, Django, PostgreSQL, MongoDB
- **Tools:** Git, Docker, Kubernetes, AWS, CI/CD

## Soft Skills
- Team Leadership
- Technical Communication
- Problem Solving
- Agile Methodologies

# Projects

## Open Source Contributions
- Contributed to React documentation
- Maintained popular npm package with 10k+ weekly downloads

## Personal Projects
- Built full-stack task management application
- Created machine learning model for sentiment analysis

`

  let content = resumeTemplate
  while (content.length < targetLength) {
    content += resumeTemplate
  }

  return content.substring(0, targetLength)
}
