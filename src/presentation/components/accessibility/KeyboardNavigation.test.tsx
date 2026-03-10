/**
 * Acceptance Tests for Story 8.2: Keyboard Navigation
 *
 * As a keyboard user
 * I want to navigate using Tab and arrow keys
 * So that I can use the app without a mouse
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { FocusTrap } from './FocusTrap'

describe('Story 8.2: Keyboard Navigation', () => {
  const user = userEvent.setup()

  describe('Given a focus trap component', () => {
    describe('When isActive is true', () => {
      it('Then focus should be trapped within the container', async () => {
        // Given
        render(
          <FocusTrap isActive={true}>
            <button>First</button>
            <button>Second</button>
            <button>Last</button>
          </FocusTrap>
        )

        // When - tab through all buttons
        const firstButton = screen.getByText('First')
        firstButton.focus()

        // Tab to second
        await user.tab()
        expect(screen.getByText('Second')).toHaveFocus()

        // Tab to last
        await user.tab()
        expect(screen.getByText('Last')).toHaveFocus()

        // Tab again should wrap to first
        await user.tab()
        expect(screen.getByText('First')).toHaveFocus()
      })

      it('Then Shift+Tab should wrap backwards', async () => {
        // Given
        render(
          <FocusTrap isActive={true}>
            <button>First</button>
            <button>Last</button>
          </FocusTrap>
        )

        // When
        screen.getByText('First').focus()
        await user.tab({ shift: true })

        // Then
        expect(screen.getByText('Last')).toHaveFocus()
      })
    })

    describe('When isActive is false', () => {
      it('Then focus should not be trapped', async () => {
        // Given
        render(
          <div>
            <button>Outside</button>
            <FocusTrap isActive={false}>
              <button>Inside</button>
            </FocusTrap>
          </div>
        )

        // Then - should be able to tab normally
        const insideButton = screen.getByText('Inside')
        expect(insideButton).toBeInTheDocument()
      })
    })
  })

  describe('Given escape key support', () => {
    it('Then pressing Escape should call onEscape callback', async () => {
      // Given
      const onEscape = vi.fn()
      render(
        <FocusTrap isActive={true} onEscape={onEscape}>
          <button>Content</button>
        </FocusTrap>
      )

      // When
      await user.keyboard('{Escape}')

      // Then
      expect(onEscape).toHaveBeenCalled()
    })
  })
})
