/**
 * Modern Template
 *
 * Sans-serif fonts with a two-column contemporary layout.
 * Story 3.4: Modern Template Style
 */

export interface ModernTemplateStyles {
  fontFamily: string
  layout: string
  headingColor: string
  headingWeight: string
  accentColor: string
  sectionSpacing: string
  lineHeight: string
}

export interface ModernTemplate {
  id: string
  name: string
  description: string
  className: string
  styles: ModernTemplateStyles
}

export const modernTemplate: ModernTemplate = {
  id: 'modern',
  name: 'Modern',
  description: 'Contemporary sans-serif fonts with a two-column layout. Great for tech and creative industries.',
  className: 'template-modern',
  styles: {
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
    layout: 'two-column',
    headingColor: '#2563eb',
    headingWeight: '600',
    accentColor: '#3b82f6',
    sectionSpacing: '1rem',
    lineHeight: '1.5',
  },
}
