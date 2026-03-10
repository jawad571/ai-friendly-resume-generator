/**
 * Acceptance Tests for Story 8.1: Skip Link
 *
 * As a keyboard user
 * I want a skip link to jump to main content
 * So that I can bypass repetitive navigation
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SkipLink } from './SkipLink'

describe('Story 8.1: Skip Link', () => {
  describe('Given the skip link exists', () => {
    describe('When the page loads', () => {
      it('Then it should be present but visually hidden', () => {
        // Given
        render(<SkipLink targetId="main-content" />)

        // Then
        const link = screen.getByRole('link', { name: /skip/i })
        expect(link).toBeInTheDocument()
        expect(link.className).toMatch(/sr-only|visually-hidden|absolute/)
      })
    })

    describe('When the link receives focus', () => {
      it('Then it should become visible', async () => {
        // Given
        render(
          <div>
            <SkipLink targetId="main-content" />
            <main id="main-content">Main Content</main>
          </div>
        )

        // When
        const link = screen.getByRole('link', { name: /skip/i })
        await link.focus()

        // Then
        expect(link.className).toMatch(/focus:not-sr-only|focus:visible|focus:relative/)
      })
    })

    describe('When the link is clicked', () => {
      it('Then it should have the correct href', () => {
        // Given
        render(<SkipLink targetId="main-content" />)

        // Then
        const link = screen.getByRole('link', { name: /skip/i })
        expect(link).toHaveAttribute('href', '#main-content')
      })
    })
  })
})
