/**
 * Integration Tests for Story 6.1: Display Welcome Message in App
 *
 * Tests that the welcome message is properly integrated into the main App
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

// Mock html2pdf.js
vi.mock('html2pdf.js', () => {
  return {
    default: () => ({
      set: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      save: vi.fn().mockResolvedValue(undefined),
    }),
  }
})

describe('Story 6.1: Welcome Message Integration in App', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Given I am a first-time visitor', () => {
    it('Then I should see the welcome message overlay', () => {
      // Given / When
      render(<App />)

      // Then
      const welcomeDialog = screen.getByRole('dialog', { name: /welcome/i })
      expect(welcomeDialog).toBeInTheDocument()
    })

    it('Then I should be able to dismiss the welcome message', async () => {
      // Given
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      // When
      const dismissButton = screen.getByRole('button', { name: /get started/i })
      await user.click(dismissButton)

      // Then
      await waitFor(() => {
        const welcomeDialog = screen.queryByRole('dialog', { name: /welcome/i })
        expect(welcomeDialog).not.toBeInTheDocument()
      })
    })

    it('Then after dismissing, the welcome should not show on next visit', async () => {
      // Given
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      const { unmount } = render(<App />)

      // When - dismiss the welcome
      const dismissButton = screen.getByRole('button', { name: /get started/i })
      await user.click(dismissButton)

      // Unmount and remount to simulate page refresh
      unmount()
      render(<App />)

      // Then
      const welcomeDialog = screen.queryByRole('dialog', { name: /welcome/i })
      expect(welcomeDialog).not.toBeInTheDocument()
    })
  })

  describe('Given I am a returning visitor', () => {
    it('Then I should not see the welcome message', () => {
      // Given - set localStorage to indicate returning visitor
      localStorage.setItem('resume:hasVisited', 'true')

      // When
      render(<App />)

      // Then
      const welcomeDialog = screen.queryByRole('dialog', { name: /welcome/i })
      expect(welcomeDialog).not.toBeInTheDocument()
    })
  })
})
