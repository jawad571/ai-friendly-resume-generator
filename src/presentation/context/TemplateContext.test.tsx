/**
 * Acceptance Tests for Story 3.6: Template Context and State Management
 *
 * As a job seeker
 * I want my template preference to be saved
 * So that I don't have to select it every time I visit
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TemplateProvider, useTemplate } from './TemplateContext'

// Test component to access context
function TestComponent() {
  const { selectedTemplate, setSelectedTemplate, template } = useTemplate()
  return (
    <div>
      <span data-testid="selected-id">{selectedTemplate}</span>
      <span data-testid="template-name">{template.name}</span>
      <span data-testid="template-class">{template.className}</span>
      <button onClick={() => setSelectedTemplate('modern')}>Set Modern</button>
      <button onClick={() => setSelectedTemplate('minimal')}>Set Minimal</button>
      <button onClick={() => setSelectedTemplate('classic')}>Set Classic</button>
    </div>
  )
}

describe('Story 3.6: Template Context and State Management', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('Given a fresh visit (no saved preference)', () => {
    describe('When the app loads', () => {
      it('Then it should default to the classic template', () => {
        // Given
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // Then
        expect(screen.getByTestId('selected-id')).toHaveTextContent('classic')
        expect(screen.getByTestId('template-name')).toHaveTextContent('Classic')
      })
    })
  })

  describe('Given a user selects a template', () => {
    describe('When they choose the modern template', () => {
      it('Then the context should update to modern', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // When
        await user.click(screen.getByText('Set Modern'))

        // Then
        expect(screen.getByTestId('selected-id')).toHaveTextContent('modern')
        expect(screen.getByTestId('template-name')).toHaveTextContent('Modern')
      })

      it('Then the preference should be saved to localStorage', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // When
        await user.click(screen.getByText('Set Modern'))

        // Then
        expect(localStorage.getItem('resume:template')).toBe('modern')
      })
    })

    describe('When they choose the minimal template', () => {
      it('Then the context should update to minimal', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // When
        await user.click(screen.getByText('Set Minimal'))

        // Then
        expect(screen.getByTestId('selected-id')).toHaveTextContent('minimal')
        expect(screen.getByTestId('template-name')).toHaveTextContent('Minimal')
      })
    })
  })

  describe('Given a returning visit with saved preference', () => {
    describe('When the user previously selected modern', () => {
      it('Then the app should load with modern template', () => {
        // Given - simulate previous selection
        localStorage.setItem('resume:template', 'modern')

        // When
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // Then
        expect(screen.getByTestId('selected-id')).toHaveTextContent('modern')
        expect(screen.getByTestId('template-name')).toHaveTextContent('Modern')
      })
    })

    describe('When the user previously selected minimal', () => {
      it('Then the app should load with minimal template', () => {
        // Given
        localStorage.setItem('resume:template', 'minimal')

        // When
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // Then
        expect(screen.getByTestId('selected-id')).toHaveTextContent('minimal')
        expect(screen.getByTestId('template-name')).toHaveTextContent('Minimal')
      })
    })

    describe('When there is an invalid saved preference', () => {
      it('Then it should fall back to the default (classic) template', () => {
        // Given - invalid template id
        localStorage.setItem('resume:template', 'invalid-template')

        // When
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // Then
        expect(screen.getByTestId('selected-id')).toHaveTextContent('classic')
      })
    })
  })

  describe('Given the template provides style information', () => {
    describe('When accessing the current template', () => {
      it('Then it should provide the CSS className', () => {
        // Given
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // Then
        expect(screen.getByTestId('template-class')).toHaveTextContent('template-classic')
      })

      it('Then it should update className when template changes', async () => {
        // Given
        const user = userEvent.setup()
        render(
          <TemplateProvider>
            <TestComponent />
          </TemplateProvider>
        )

        // When
        await user.click(screen.getByText('Set Modern'))

        // Then
        expect(screen.getByTestId('template-class')).toHaveTextContent('template-modern')
      })
    })
  })
})

describe('useTemplate hook', () => {
  it('should throw error when used outside provider', () => {
    // Given
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // When/Then
    expect(() => render(<TestComponent />)).toThrow(
      'useTemplate must be used within a TemplateProvider'
    )

    consoleSpy.mockRestore()
  })
})
