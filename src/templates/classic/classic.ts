/**
 * Classic Template
 *
 * Traditional serif fonts with a conservative layout.
 * Story 3.3: Classic Template Style
 */

export interface ClassicTemplateStyles {
  fontFamily: string
  layout: string
  headingColor: string
  headingWeight: string
  sectionSpacing: string
  lineHeight: string
}

export interface ClassicTemplate {
  id: string
  name: string
  description: string
  className: string
  styles: ClassicTemplateStyles
}

export const classicTemplate: ClassicTemplate = {
  id: 'classic',
  name: 'Classic',
  description: 'Traditional serif fonts with a conservative single-column layout. Perfect for traditional industries.',
  className: 'template-classic',
  styles: {
    fontFamily: 'Georgia, Times New Roman, serif',
    layout: 'single-column',
    headingColor: '#1a1a1a',
    headingWeight: '700',
    sectionSpacing: '1.25rem',
    lineHeight: '1.6',
  },
}
