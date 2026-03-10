/**
 * SchemaViewer Component Tests
 *
 * Story 5.1: Access Schema Template
 * Tests for viewing the resume markdown schema template.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SchemaViewer } from './SchemaViewer'

describe('Story 5.1: Access Schema Template - SchemaViewer', () => {
  describe('Given a user wants to view the resume schema template', () => {
    describe('When they access the SchemaViewer component', () => {
      it('Then it should display the schema template in readable format', () => {
        render(<SchemaViewer />)

        // Schema should be visible
        expect(screen.getByTestId('schema-content')).toBeInTheDocument()
      })

      it('Then it should include the contact section in the schema', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        expect(schemaContent.textContent).toContain('# John Doe')
      })

      it('Then it should include the experience section in the schema', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        expect(schemaContent.textContent).toContain('# Experience')
      })

      it('Then it should include the education section in the schema', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        expect(schemaContent.textContent).toContain('# Education')
      })

      it('Then it should include the skills section in the schema', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        expect(schemaContent.textContent).toContain('# Skills')
      })

      it('Then it should show example values to illustrate format', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        // Should contain sample/example content
        expect(schemaContent.textContent).toMatch(/John Doe|Experience|Education|Skills/)
      })

      it('Then it should display content with proper heading hierarchy', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        // Should have main heading markers
        expect(schemaContent.textContent).toContain('#')
      })
    })

    describe('When the schema template is rendered', () => {
      it('Then it should be formatted as valid Markdown', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        const text = schemaContent.textContent || ''

        // Valid markdown should have headers and list items
        expect(text).toMatch(/^# |^## |^\* |^- /m)
      })

      it('Then it should include a summary section', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        expect(schemaContent.textContent).toContain('# Summary')
      })

      it('Then it should include a projects section (optional but documented)', () => {
        render(<SchemaViewer />)

        const schemaContent = screen.getByTestId('schema-content')
        expect(schemaContent.textContent).toContain('# Projects')
      })
    })
  })
})
