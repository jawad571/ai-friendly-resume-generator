/**
 * Templates Index
 *
 * Export all available templates for easy access.
 */

export { classicTemplate } from './classic/classic'
export type { ClassicTemplate, ClassicTemplateStyles } from './classic/classic'

export { modernTemplate } from './modern/modern'
export type { ModernTemplate, ModernTemplateStyles } from './modern/modern'

export { minimalTemplate } from './minimal/minimal'
export type { MinimalTemplate, MinimalTemplateStyles } from './minimal/minimal'

export type TemplateId = 'classic' | 'modern' | 'minimal'

export interface BaseTemplate {
  id: TemplateId
  name: string
  description: string
  className: string
  styles: {
    fontFamily: string
    layout: string
    headingColor: string
    headingWeight: string
    sectionSpacing: string
    lineHeight: string
    [key: string]: string
  }
}

export const templates: BaseTemplate[] = [
  {
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
  },
  {
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
  },
  {
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
  },
]

export function getTemplateById(id: TemplateId): BaseTemplate | undefined {
  return templates.find((t) => t.id === id)
}

export function getDefaultTemplate(): BaseTemplate {
  return templates[0] // Classic is default
}
