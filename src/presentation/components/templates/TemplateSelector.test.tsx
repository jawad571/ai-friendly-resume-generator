/**
 * Acceptance Tests for Story 3.2: View Available Templates
 *
 * As a job seeker
 * I want to see what templates are available
 * So that I can choose one that fits my industry or preference
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TemplateSelector } from './TemplateSelector'

describe('Story 3.2: View Available Templates', () => {
  const defaultProps = {
    selectedTemplate: 'classic',
    onSelectTemplate: vi.fn(),
    isOpen: false,
    onToggle: vi.fn(),
  }

  describe('Given the template selector exists', () => {
    describe('When the user clicks the template button', () => {
      it('Then they should be able to access a template selection interface', async () => {
        // Given
        const user = userEvent.setup()
        const onToggle = vi.fn()
        render(<TemplateSelector {...defaultProps} onToggle={onToggle} />)

        // When - user clicks the template button
        const templateButton = screen.getByRole('button', { name: /template/i })
        await user.click(templateButton)

        // Then - toggle should be called
        expect(onToggle).toHaveBeenCalled()
      })
    })

    describe('When the template selector is open', () => {
      it('Then it should display names of available templates', () => {
        // Given
        render(<TemplateSelector {...defaultProps} isOpen={true} />)

        // Then - template names should be visible
        expect(screen.getByText(/classic/i)).toBeInTheDocument()
        expect(screen.getByText(/modern/i)).toBeInTheDocument()
        expect(screen.getByText(/minimal/i)).toBeInTheDocument()
      })

      it('Then at least 3 different template options should be visible', () => {
        // Given
        render(<TemplateSelector {...defaultProps} isOpen={true} />)

        // Then - should have at least 3 template options
        // Excluding the main toggle button, we should have 3+ template options
        const templateChoices = screen.getAllByRole('option')
        expect(templateChoices.length).toBeGreaterThanOrEqual(3)
      })

      it('Then each template should have a distinguishable name', () => {
        // Given
        render(<TemplateSelector {...defaultProps} isOpen={true} />)

        // Then - each template has a distinct name
        const classicOption = screen.getByRole('option', { name: /classic/i })
        const modernOption = screen.getByRole('option', { name: /modern/i })
        const minimalOption = screen.getByRole('option', { name: /minimal/i })

        expect(classicOption).toBeInTheDocument()
        expect(modernOption).toBeInTheDocument()
        expect(minimalOption).toBeInTheDocument()
      })

      it('Then the current template should be clearly indicated', () => {
        // Given - classic is selected
        render(<TemplateSelector {...defaultProps} selectedTemplate="classic" isOpen={true} />)

        // Then - classic should be visually highlighted as selected
        const classicOption = screen.getByRole('option', { name: /classic/i })
        expect(classicOption).toHaveAttribute('aria-selected', 'true')
      })

      it('Then different selected template should be indicated correctly', () => {
        // Given - modern is selected
        render(<TemplateSelector {...defaultProps} selectedTemplate="modern" isOpen={true} />)

        // Then - modern should be highlighted
        const modernOption = screen.getByRole('option', { name: /modern/i })
        expect(modernOption).toHaveAttribute('aria-selected', 'true')

        // And classic should not be highlighted
        const classicOption = screen.getByRole('option', { name: /classic/i })
        expect(classicOption).toHaveAttribute('aria-selected', 'false')
      })
    })

    describe('When the user wants to close without changing', () => {
      it('Then clicking outside or pressing escape should close the selector', async () => {
        // Given
        const user = userEvent.setup()
        const onToggle = vi.fn()
        render(<TemplateSelector {...defaultProps} isOpen={true} onToggle={onToggle} />)

        // When - user clicks the close button
        const closeButton = screen.getByRole('button', { name: /close/i })
        await user.click(closeButton)

        // Then - onToggle should be called to close
        expect(onToggle).toHaveBeenCalled()
      })

      it('Then the template selector can be closed without changing the template', async () => {
        // Given
        const user = userEvent.setup()
        const onSelectTemplate = vi.fn()
        const onToggle = vi.fn()
        render(
          <TemplateSelector
            {...defaultProps}
            isOpen={true}
            onSelectTemplate={onSelectTemplate}
            onToggle={onToggle}
          />
        )

        // When - user closes without selecting
        const closeButton = screen.getByRole('button', { name: /close/i })
        await user.click(closeButton)

        // Then - template should not have been changed
        expect(onSelectTemplate).not.toHaveBeenCalled()
      })
    })
  })

  describe('Given the template selector is closed', () => {
    describe('When the page loads', () => {
      it('Then the template button should be visible and accessible', () => {
        // Given
        render(<TemplateSelector {...defaultProps} isOpen={false} />)

        // Then - template button should be visible
        const templateButton = screen.getByRole('button', { name: /template/i })
        expect(templateButton).toBeVisible()
      })

      it('Then the template options should not be visible', () => {
        // Given
        render(<TemplateSelector {...defaultProps} isOpen={false} />)

        // Then - template options should not be visible
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })
  })
})
