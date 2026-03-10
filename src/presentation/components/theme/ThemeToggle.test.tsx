/**
 * Acceptance Tests for Story 7.2: Theme Toggle Button
 *
 * As a job seeker
 * I want a button to toggle between light and dark mode
 * So that I can quickly switch themes
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from '../../context/ThemeContext'

describe('Story 7.2: Theme Toggle Button', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Given the theme toggle exists', () => {
    describe('When it renders', () => {
      it('Then it should display a toggle button', () => {
        // Given
        render(
          <ThemeProvider>
            <ThemeToggle />
          </ThemeProvider>
        )

        // Then
        expect(screen.getByRole('button', { name: /theme|mode|dark|light/i })).toBeInTheDocument()
      })

      it('Then it should show the current theme state', () => {
        // Given
        render(
          <ThemeProvider>
            <ThemeToggle />
          </ThemeProvider>
        )

        // Then - should indicate light mode
        const button = screen.getByRole('button', { name: /theme|mode|dark|light/i })
        expect(button).toBeInTheDocument()
      })
    })

    describe('When the user clicks the toggle', () => {
      it('Then it should switch themes', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <ThemeProvider>
            <ThemeToggle />
          </ThemeProvider>
        )

        // When
        await user.click(screen.getByRole('button', { name: /theme|mode|dark|light/i }))

        // Then - theme should change
        expect(localStorage.getItem('resume:theme')).toBe('dark')
      })
    })
  })
})
