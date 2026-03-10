/**
 * Acceptance Tests for Story 6.2: Loading Indicator
 *
 * As a job seeker
 * I want to see loading indicators during async operations
 * So that I know the system is processing my request
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LoadingIndicator } from './LoadingIndicator'

describe('Story 6.2: Loading Indicator', () => {
  describe('Given a loading state is active', () => {
    describe('When the loading indicator renders', () => {
      it('Then it should display a visual loading animation', () => {
        // Given
        render(<LoadingIndicator isLoading={true} />)

        // Then
        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
      })

      it('Then it should be accessible with proper role', () => {
        // Given
        render(<LoadingIndicator isLoading={true} />)

        // Then
        expect(screen.getByRole('status')).toBeInTheDocument()
      })

      it('Then it should display the loading message if provided', () => {
        // Given
        render(<LoadingIndicator isLoading={true} message="Processing..." />)

        // Then
        expect(screen.getByText('Processing...')).toBeInTheDocument()
      })
    })
  })

  describe('Given no loading state', () => {
    describe('When the loading indicator renders', () => {
      it('Then it should not show any loading element', () => {
        // Given
        render(<LoadingIndicator isLoading={false} />)

        // Then
        expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument()
      })
    })
  })

  describe('Given different sizes', () => {
    it('Then it should render small size', () => {
      // Given
      render(<LoadingIndicator isLoading={true} size="small" />)

      // Then
      const indicator = screen.getByTestId('loading-indicator')
      expect(indicator.className).toMatch(/w-4|h-4|small/)
    })

    it('Then it should render medium size by default', () => {
      // Given
      render(<LoadingIndicator isLoading={true} />)

      // Then
      const indicator = screen.getByTestId('loading-indicator')
      expect(indicator.className).toMatch(/w-6|h-6|medium/)
    })

    it('Then it should render large size', () => {
      // Given
      render(<LoadingIndicator isLoading={true} size="large" />)

      // Then
      const indicator = screen.getByTestId('loading-indicator')
      expect(indicator.className).toMatch(/w-8|h-8|large/)
    })
  })
})
