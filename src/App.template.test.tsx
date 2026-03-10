/**
 * Acceptance Tests for Template Integration in App
 *
 * Story 3.7: Template Selection Integration
 * As a job seeker
 * I want to switch templates and see the preview update
 * So that I can choose the best template for my resume
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App'

describe('Story 3.7: Template Selection Integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Given the application is loaded', () => {
    describe('When the user views the header', () => {
      it('Then they should see a Template button', () => {
        // Given
        render(<App />)

        // Then
        expect(screen.getByRole('button', { name: /template/i })).toBeInTheDocument()
      })
    })

    describe('When the user clicks the Template button', () => {
      it('Then the template selector should open', async () => {
        // Given
        const user = userEvent.setup()
        render(<App />)

        // When
        await user.click(screen.getByRole('button', { name: /template/i }))

        // Then - should see template options
        expect(screen.getByText('Classic')).toBeInTheDocument()
        expect(screen.getByText('Modern')).toBeInTheDocument()
        expect(screen.getByText('Minimal')).toBeInTheDocument()
      })
    })

    describe('When the user selects a template', () => {
      it('Then the preview should reflect the new template style', async () => {
        // Given
        const user = userEvent.setup()
        render(<App />)

        // When - open template selector and choose modern
        await user.click(screen.getByRole('button', { name: /template/i }))
        await user.click(screen.getByRole('option', { name: /modern/i }))

        // Then - the preview should have modern template class
        await waitFor(() => {
          const preview = screen.getByTestId('preview')
          expect(preview.className).toContain('template-modern')
        })
      })

      it('Then the selection should be saved to localStorage', async () => {
        // Given
        const user = userEvent.setup()
        render(<App />)

        // When
        await user.click(screen.getByRole('button', { name: /template/i }))
        await user.click(screen.getByRole('option', { name: /minimal/i }))

        // Then
        expect(localStorage.getItem('resume:template')).toBe('minimal')
      })
    })
  })

  describe('Given a returning user with saved template', () => {
    describe('When they had previously selected modern template', () => {
      it('Then the preview should load with modern template class', () => {
        // Given
        localStorage.setItem('resume:template', 'modern')

        // When
        render(<App />)

        // Then
        const preview = screen.getByTestId('preview')
        expect(preview.className).toContain('template-modern')
      })
    })
  })

  describe('Given the user closes the template selector', () => {
    describe('When they click the close button', () => {
      it('Then the selector should close without changing the template', async () => {
        // Given
        const user = userEvent.setup()
        render(<App />)

        // Open selector
        await user.click(screen.getByRole('button', { name: /template/i }))
        expect(screen.getByRole('listbox')).toBeInTheDocument()

        // When - close without selecting
        await user.click(screen.getByRole('button', { name: /close/i }))

        // Then
        await waitFor(() => {
          expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })
      })
    })
  })
})
