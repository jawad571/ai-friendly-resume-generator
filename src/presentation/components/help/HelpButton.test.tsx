/**
 * HelpButton Component Tests
 *
 * Story 5.1: Access Schema Template
 * Tests for the help button that opens the help panel.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelpButton } from './HelpButton'

describe('Story 5.1: Access Schema Template - HelpButton', () => {
  describe('Given a user wants to access help/schema', () => {
    describe('When the HelpButton is rendered', () => {
      it('Then it should be visible in the interface', () => {
        render(<HelpButton onClick={() => {}} />)

        expect(screen.getByRole('button', { name: /help|schema|guide/i })).toBeInTheDocument()
      })

      it('Then it should be clearly labeled', () => {
        render(<HelpButton onClick={() => {}} />)

        const button = screen.getByRole('button', { name: /help|schema|guide/i })
        expect(button).toHaveAccessibleName()
      })
    })

    describe('When the user clicks the help button', () => {
      it('Then it should trigger the onClick callback', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()

        render(<HelpButton onClick={onClick} />)

        const button = screen.getByRole('button', { name: /help|schema|guide/i })
        await user.click(button)

        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })
  })
})
