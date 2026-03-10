/**
 * Acceptance Tests for Story 7.1: Dark Mode Support
 *
 * As a job seeker
 * I want to toggle between light and dark mode
 * So that I can use the application comfortably in different lighting conditions
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeContext'

// Test component to access context
function TestComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
    </div>
  )
}

describe('Story 7.1: Dark Mode Support', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Given a fresh visit (no saved preference)', () => {
    describe('When the app loads', () => {
      it('Then it should default to light theme', () => {
        // Given
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        )

        // Then
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      })
    })
  })

  describe('Given the user toggles the theme', () => {
    describe('When the user clicks the toggle button', () => {
      it('Then the theme should switch from light to dark', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        )

        // When
        await user.click(screen.getByText('Toggle Theme'))

        // Then
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
      })

      it('Then toggling again should switch back to light', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        )

        // When
        await user.click(screen.getByText('Toggle Theme'))
        await user.click(screen.getByText('Toggle Theme'))

        // Then
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      })
    })

    describe('When the user sets a specific theme', () => {
      it('Then the theme should be set to dark', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        )

        // When
        await user.click(screen.getByText('Set Dark'))

        // Then
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
      })
    })
  })

  describe('Given the theme preference is saved', () => {
    describe('When the user changes the theme', () => {
      it('Then the preference should be saved to localStorage', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        )

        // When
        await user.click(screen.getByText('Toggle Theme'))

        // Then
        expect(localStorage.getItem('resume:theme')).toBe('dark')
      })
    })

    describe('When returning to the app', () => {
      it('Then the saved preference should be restored', () => {
        // Given
        localStorage.setItem('resume:theme', 'dark')

        // When
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        )

        // Then
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
      })
    })
  })
})

describe('useTheme hook', () => {
  it('should throw error when used outside provider', () => {
    // Given
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // When/Then
    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    )

    consoleSpy.mockRestore()
  })
})
