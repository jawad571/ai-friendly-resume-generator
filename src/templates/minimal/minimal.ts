/**
 * Minimal Template
 *
 * Clean, sparse design with lots of whitespace.
 * Story 3.5: Minimal Template Style
 */

export interface MinimalTemplateStyles {
  fontFamily: string
  layout: string
  headingColor: string
  headingWeight: string
  padding: string
  sectionSpacing: string
  lineHeight: string
}

export interface MinimalTemplate {
  id: string
  name: string
  description: string
  className: string
  styles: MinimalTemplateStyles
}

export const minimalTemplate: MinimalTemplate = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Clean, sparse design with generous whitespace. Ideal for those who prefer simplicity.',
  className: 'template-minimal',
  styles: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    layout: 'single-column',
    headingColor: '#374151',
    headingWeight: '500',
    padding: '2rem',
    sectionSpacing: '2rem',
    lineHeight: '1.75',
  },
}
