/**
 * Acceptance Tests for Story 6.1: Character Count
 *
 * As a job seeker
 * I want to see the character and word count of my resume
 * So that I can ensure my resume is an appropriate length
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CharacterCount } from './CharacterCount'

describe('Story 6.1: Character Count', () => {
  describe('Given the character count component exists', () => {
    describe('When content is provided', () => {
      it('Then it should display the character count', () => {
        // Given
        const content = 'Hello World'

        // When
        render(<CharacterCount content={content} />)

        // Then
        expect(screen.getByText(/11/)).toBeInTheDocument()
        expect(screen.getByText(/character/i)).toBeInTheDocument()
      })

      it('Then it should display the word count', () => {
        // Given
        const content = 'Hello World'

        // When
        render(<CharacterCount content={content} />)

        // Then
        expect(screen.getByText(/2/)).toBeInTheDocument()
        expect(screen.getByText(/word/i)).toBeInTheDocument()
      })

      it('Then it should update when content changes', () => {
        // Given
        const { rerender } = render(<CharacterCount content="Hello" />)
        expect(screen.getByText(/5/)).toBeInTheDocument()

        // When
        rerender(<CharacterCount content="Hello World" />)

        // Then
        expect(screen.getByText(/11/)).toBeInTheDocument()
      })
    })

    describe('When content is empty', () => {
      it('Then it should display zero counts', () => {
        // Given
        render(<CharacterCount content="" />)

        // Then
        expect(screen.getByText(/0.*character/i)).toBeInTheDocument()
        expect(screen.getByText(/0.*word/i)).toBeInTheDocument()
      })
    })

    describe('When content has multiple words', () => {
      it('Then it should count words correctly', () => {
        // Given
        const content = 'This is a test sentence with seven words'

        // When
        render(<CharacterCount content={content} />)

        // Then - should show 8 words
        expect(screen.getByText(/8.*word/i)).toBeInTheDocument()
      })
    })

    describe('When content has newlines', () => {
      it('Then it should count characters including newlines', () => {
        // Given
        const content = 'Line 1\nLine 2'

        // When
        render(<CharacterCount content={content} />)

        // Then - should show 13 characters (including newline)
        expect(screen.getByText(/13.*character/i)).toBeInTheDocument()
      })
    })
  })
})
