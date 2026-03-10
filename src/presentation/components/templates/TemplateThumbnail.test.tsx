/**
 * Acceptance Tests for TemplateThumbnail Component
 *
 * Part of Story 3.2: View Available Templates
 * A preview thumbnail for each template option
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TemplateThumbnail } from './TemplateThumbnail'

describe('TemplateThumbnail Component', () => {
  const defaultProps = {
    templateId: 'classic',
    templateName: 'Classic',
    isSelected: false,
    onClick: vi.fn(),
  }

  describe('Given a template thumbnail', () => {
    describe('When it is rendered', () => {
      it('Then it should display the template name', () => {
        // Given
        render(<TemplateThumbnail {...defaultProps} />)

        // Then
        expect(screen.getByText('Classic')).toBeInTheDocument()
      })

      it('Then it should show a visual preview representation', () => {
        // Given
        render(<TemplateThumbnail {...defaultProps} />)

        // Then - should have a preview area
        const thumbnail = screen.getByRole('option', { name: /classic/i })
        expect(thumbnail).toBeInTheDocument()
      })

      it('Then it should be clickable', async () => {
        // Given
        const user = userEvent.setup()
        const onClick = vi.fn()
        render(<TemplateThumbnail {...defaultProps} onClick={onClick} />)

        // When
        const thumbnail = screen.getByRole('option', { name: /classic/i })
        await user.click(thumbnail)

        // Then
        expect(onClick).toHaveBeenCalledWith('classic')
      })
    })

    describe('When the template is selected', () => {
      it('Then it should show a selected state', () => {
        // Given
        render(<TemplateThumbnail {...defaultProps} isSelected={true} />)

        // Then
        const thumbnail = screen.getByRole('option', { name: /classic/i })
        expect(thumbnail).toHaveAttribute('aria-selected', 'true')
      })

      it('Then it should have visual indication of selection', () => {
        // Given
        render(<TemplateThumbnail {...defaultProps} isSelected={true} />)

        // Then - should have a visual class indicating selection
        const thumbnail = screen.getByRole('option', { name: /classic/i })
        expect(thumbnail.className).toMatch(/selected|ring|border-blue/)
      })
    })

    describe('When the template is not selected', () => {
      it('Then it should not show selected state', () => {
        // Given
        render(<TemplateThumbnail {...defaultProps} isSelected={false} />)

        // Then
        const thumbnail = screen.getByRole('option', { name: /classic/i })
        expect(thumbnail).toHaveAttribute('aria-selected', 'false')
      })
    })
  })

  describe('Given different template types', () => {
    it('Then Classic template thumbnail should render correctly', () => {
      render(
        <TemplateThumbnail
          templateId="classic"
          templateName="Classic"
          isSelected={false}
          onClick={vi.fn()}
        />
      )
      expect(screen.getByText('Classic')).toBeInTheDocument()
    })

    it('Then Modern template thumbnail should render correctly', () => {
      render(
        <TemplateThumbnail
          templateId="modern"
          templateName="Modern"
          isSelected={false}
          onClick={vi.fn()}
        />
      )
      expect(screen.getByText('Modern')).toBeInTheDocument()
    })

    it('Then Minimal template thumbnail should render correctly', () => {
      render(
        <TemplateThumbnail
          templateId="minimal"
          templateName="Minimal"
          isSelected={false}
          onClick={vi.fn()}
        />
      )
      expect(screen.getByText('Minimal')).toBeInTheDocument()
    })
  })
})
