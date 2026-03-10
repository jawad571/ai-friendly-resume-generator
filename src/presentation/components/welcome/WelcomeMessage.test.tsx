/**
 * Acceptance Tests for Story 6.1: Display Welcome Message
 *
 * As a first-time user
 * I want to see a welcome message when I first visit
 * So that I understand how to get started with the application
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WelcomeMessage } from './WelcomeMessage'

describe('Story 6.1: Display Welcome Message', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Given I am a first-time visitor', () => {
    describe('When I open the application', () => {
      it('Then I should see a welcome message overlay', () => {
        // Given / When
        render(<WelcomeMessage isFirstVisit={true} onDismiss={() => {}} />)

        // Then
        const welcomeOverlay = screen.getByRole('dialog', { name: /welcome/i })
        expect(welcomeOverlay).toBeInTheDocument()
        expect(welcomeOverlay).toBeVisible()
      })

      it('Then the message should explain what the app does', () => {
        // Given / When
        render(<WelcomeMessage isFirstVisit={true} onDismiss={() => {}} />)

        // Then
        const welcomeContent = screen.getByRole('dialog', { name: /welcome/i })
        expect(welcomeContent).toHaveTextContent(/resume/i)
      })

      it('Then the message should explain how to get started', () => {
        // Given / When
        render(<WelcomeMessage isFirstVisit={true} onDismiss={() => {}} />)

        // Then
        const welcomeContent = screen.getByRole('dialog', { name: /welcome/i })
        expect(welcomeContent).toHaveTextContent(/markdown|editor|write|start/i)
      })
    })

    describe('When I dismiss the welcome message', () => {
      it('Then clicking the dismiss button should close the overlay', async () => {
        // Given
        const user = userEvent.setup()
        const onDismiss = vi.fn()
        render(<WelcomeMessage isFirstVisit={true} onDismiss={onDismiss} />)

        // When
        const dismissButton = screen.getByRole('button', { name: /get started|close|dismiss|ok/i })
        await user.click(dismissButton)

        // Then
        expect(onDismiss).toHaveBeenCalled()
      })

      it('Then the welcome message should have a clear dismiss option', () => {
        // Given / When
        render(<WelcomeMessage isFirstVisit={true} onDismiss={() => {}} />)

        // Then
        const dismissButton = screen.getByRole('button', { name: /get started|close|dismiss|ok/i })
        expect(dismissButton).toBeInTheDocument()
        expect(dismissButton).toBeVisible()
      })
    })
  })

  describe('Given I am a returning visitor', () => {
    describe('When I open the application', () => {
      it('Then the welcome message should not be displayed', () => {
        // Given / When
        render(<WelcomeMessage isFirstVisit={false} onDismiss={() => {}} />)

        // Then
        const welcomeOverlay = screen.queryByRole('dialog', { name: /welcome/i })
        expect(welcomeOverlay).not.toBeInTheDocument()
      })
    })
  })

  describe('Given the welcome message content', () => {
    describe('When the user reads it', () => {
      it('Then it should be friendly and welcoming', () => {
        // Given / When
        render(<WelcomeMessage isFirstVisit={true} onDismiss={() => {}} />)

        // Then
        const welcomeContent = screen.getByRole('dialog', { name: /welcome/i })
        expect(welcomeContent).toHaveTextContent(/welcome/i)
      })

      it('Then it should highlight key features', () => {
        // Given / When
        render(<WelcomeMessage isFirstVisit={true} onDismiss={() => {}} />)

        // Then - should mention at least one key feature
        const welcomeContent = screen.getByRole('dialog', { name: /welcome/i })
        const hasFeatures =
          welcomeContent.textContent?.toLowerCase().includes('pdf') ||
          welcomeContent.textContent?.toLowerCase().includes('markdown') ||
          welcomeContent.textContent?.toLowerCase().includes('preview') ||
          welcomeContent.textContent?.toLowerCase().includes('export')
        expect(hasFeatures).toBe(true)
      })
    })
  })
})
