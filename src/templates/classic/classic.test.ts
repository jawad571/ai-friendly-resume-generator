/**
 * Acceptance Tests for Story 3.3: Classic Template Style
 *
 * As a job seeker
 * I want a classic template option
 * So that I can present my resume in a traditional, conservative style
 */

import { describe, it, expect } from 'vitest'
import { classicTemplate } from './classic'
import type { ClassicTemplateStyles } from './classic'

describe('Story 3.3: Classic Template Style', () => {
  describe('Given the classic template is selected', () => {
    describe('When the template styles are applied', () => {
      it('Then it should use serif fonts for a traditional look', () => {
        // Given
        const styles = classicTemplate.styles

        // Then - should have serif font family
        expect(styles.fontFamily).toMatch(/serif/i)
      })

      it('Then it should have a conservative layout', () => {
        // Given
        const styles = classicTemplate.styles

        // Then - should have single column layout
        expect(styles.layout).toBe('single-column')
      })

      it('Then it should have appropriate heading styles', () => {
        // Given
        const styles = classicTemplate.styles

        // Then - headings should be styled appropriately
        expect(styles.headingColor).toBeDefined()
        expect(styles.headingWeight).toBeDefined()
      })

      it('Then it should have proper spacing and margins', () => {
        // Given
        const styles = classicTemplate.styles

        // Then - should have defined spacing
        expect(styles.sectionSpacing).toBeDefined()
        expect(styles.lineHeight).toBeDefined()
      })
    })

    describe('When the template metadata is accessed', () => {
      it('Then it should have an id of "classic"', () => {
        expect(classicTemplate.id).toBe('classic')
      })

      it('Then it should have a name of "Classic"', () => {
        expect(classicTemplate.name).toBe('Classic')
      })

      it('Then it should have a description', () => {
        expect(classicTemplate.description).toBeDefined()
        expect(classicTemplate.description.length).toBeGreaterThan(0)
      })
    })

    describe('When the template generates CSS classes', () => {
      it('Then it should provide a base class for the preview', () => {
        expect(classicTemplate.className).toBeDefined()
        expect(classicTemplate.className).toContain('classic')
      })
    })
  })
})

describe('ClassicTemplateStyles type', () => {
  it('should define all required style properties', () => {
    const styles: ClassicTemplateStyles = classicTemplate.styles

    expect(styles).toHaveProperty('fontFamily')
    expect(styles).toHaveProperty('layout')
    expect(styles).toHaveProperty('headingColor')
    expect(styles).toHaveProperty('headingWeight')
    expect(styles).toHaveProperty('sectionSpacing')
    expect(styles).toHaveProperty('lineHeight')
  })
})
