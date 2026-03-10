/**
 * Acceptance Tests for Story 3.4: Modern Template Style
 *
 * As a job seeker
 * I want a modern template option
 * So that I can present my resume in a contemporary, professional style
 */

import { describe, it, expect } from 'vitest'
import { modernTemplate } from './modern'
import type { ModernTemplateStyles } from './modern'

describe('Story 3.4: Modern Template Style', () => {
  describe('Given the modern template is selected', () => {
    describe('When the template styles are applied', () => {
      it('Then it should use sans-serif fonts for a contemporary look', () => {
        // Given
        const styles = modernTemplate.styles

        // Then - should have sans-serif font family
        expect(styles.fontFamily).toMatch(/sans-serif/i)
      })

      it('Then it should have a two-column layout', () => {
        // Given
        const styles = modernTemplate.styles

        // Then - should have two column layout
        expect(styles.layout).toBe('two-column')
      })

      it('Then it should have modern heading styles', () => {
        // Given
        const styles = modernTemplate.styles

        // Then - headings should be styled with modern colors
        expect(styles.headingColor).toBeDefined()
        expect(styles.headingWeight).toBeDefined()
        expect(styles.accentColor).toBeDefined()
      })

      it('Then it should have tighter spacing for a compact look', () => {
        // Given
        const styles = modernTemplate.styles

        // Then - should have defined spacing
        expect(styles.sectionSpacing).toBeDefined()
        expect(styles.lineHeight).toBeDefined()
      })
    })

    describe('When the template metadata is accessed', () => {
      it('Then it should have an id of "modern"', () => {
        expect(modernTemplate.id).toBe('modern')
      })

      it('Then it should have a name of "Modern"', () => {
        expect(modernTemplate.name).toBe('Modern')
      })

      it('Then it should have a description', () => {
        expect(modernTemplate.description).toBeDefined()
        expect(modernTemplate.description.length).toBeGreaterThan(0)
      })
    })

    describe('When the template generates CSS classes', () => {
      it('Then it should provide a base class for the preview', () => {
        expect(modernTemplate.className).toBeDefined()
        expect(modernTemplate.className).toContain('modern')
      })
    })
  })
})

describe('ModernTemplateStyles type', () => {
  it('should define all required style properties', () => {
    const styles: ModernTemplateStyles = modernTemplate.styles

    expect(styles).toHaveProperty('fontFamily')
    expect(styles).toHaveProperty('layout')
    expect(styles).toHaveProperty('headingColor')
    expect(styles).toHaveProperty('headingWeight')
    expect(styles).toHaveProperty('accentColor')
    expect(styles).toHaveProperty('sectionSpacing')
    expect(styles).toHaveProperty('lineHeight')
  })
})
