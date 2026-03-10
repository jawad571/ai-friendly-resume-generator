/**
 * Acceptance Tests for Story 3.5: Minimal Template Style
 *
 * As a job seeker
 * I want a minimal template option
 * So that I can present my resume with a clean, sparse design
 */

import { describe, it, expect } from 'vitest'
import { minimalTemplate } from './minimal'
import type { MinimalTemplateStyles } from './minimal'

describe('Story 3.5: Minimal Template Style', () => {
  describe('Given the minimal template is selected', () => {
    describe('When the template styles are applied', () => {
      it('Then it should use a clean font for readability', () => {
        // Given
        const styles = minimalTemplate.styles

        // Then - should have a clean font family
        expect(styles.fontFamily).toBeDefined()
      })

      it('Then it should have a single-column layout with lots of whitespace', () => {
        // Given
        const styles = minimalTemplate.styles

        // Then - should have single column layout with generous padding
        expect(styles.layout).toBe('single-column')
        expect(styles.padding).toBeDefined()
      })

      it('Then it should have subtle heading styles', () => {
        // Given
        const styles = minimalTemplate.styles

        // Then - headings should be subtle
        expect(styles.headingColor).toBeDefined()
        expect(styles.headingWeight).toBeDefined()
      })

      it('Then it should have generous spacing for a sparse look', () => {
        // Given
        const styles = minimalTemplate.styles

        // Then - should have generous spacing
        expect(styles.sectionSpacing).toBeDefined()
        expect(styles.lineHeight).toBeDefined()
        // Minimal template should have larger spacing than others
        expect(parseFloat(styles.sectionSpacing)).toBeGreaterThanOrEqual(1.5)
      })
    })

    describe('When the template metadata is accessed', () => {
      it('Then it should have an id of "minimal"', () => {
        expect(minimalTemplate.id).toBe('minimal')
      })

      it('Then it should have a name of "Minimal"', () => {
        expect(minimalTemplate.name).toBe('Minimal')
      })

      it('Then it should have a description', () => {
        expect(minimalTemplate.description).toBeDefined()
        expect(minimalTemplate.description.length).toBeGreaterThan(0)
      })
    })

    describe('When the template generates CSS classes', () => {
      it('Then it should provide a base class for the preview', () => {
        expect(minimalTemplate.className).toBeDefined()
        expect(minimalTemplate.className).toContain('minimal')
      })
    })
  })
})

describe('MinimalTemplateStyles type', () => {
  it('should define all required style properties', () => {
    const styles: MinimalTemplateStyles = minimalTemplate.styles

    expect(styles).toHaveProperty('fontFamily')
    expect(styles).toHaveProperty('layout')
    expect(styles).toHaveProperty('headingColor')
    expect(styles).toHaveProperty('headingWeight')
    expect(styles).toHaveProperty('padding')
    expect(styles).toHaveProperty('sectionSpacing')
    expect(styles).toHaveProperty('lineHeight')
  })
})
