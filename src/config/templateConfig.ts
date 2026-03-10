/**
 * Template Configuration
 *
 * Centralized configuration for resume template styling.
 * Adjust these values to change font sizes, spacing, and layout across all templates.
 */

export interface TemplateConfig {
  // Font sizes (in pt for print/PDF compatibility)
  fontSize: {
    name: number        // H1 - Your name at the top
    sectionHeading: number  // H2 - Experience, Education, Skills
    subHeading: number  // H3 - Job titles, degrees
    body: number        // Regular text
    small: number       // Contact info, dates
  }

  // Spacing (in px for screen, converts to appropriate units for PDF)
  spacing: {
    sectionGap: number      // Space between major sections
    itemGap: number         // Space between items (jobs, degrees)
    lineHeight: number      // Line height multiplier
    paragraphGap: number    // Space after paragraphs
    listItemGap: number     // Space between bullet points
  }

  // Page layout
  page: {
    marginTop: number
    marginBottom: number
    marginLeft: number
    marginRight: number
  }
}

// Default configuration - compact for single-page resumes
export const defaultConfig: TemplateConfig = {
  fontSize: {
    name: 18,           // Name/title at top
    sectionHeading: 13, // Section headers (Experience, Education)
    subHeading: 12,     // Job titles, degree names
    body: 11,           // Regular body text
    small: 10,          // Contact info, dates, minor text
  },
  spacing: {
    sectionGap: 12,     // Gap between sections
    itemGap: 8,         // Gap between job entries
    lineHeight: 1.3,    // Compact line height
    paragraphGap: 4,    // Small gap after paragraphs
    listItemGap: 2,     // Tight bullet point spacing
  },
  page: {
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 32,
    marginRight: 32,
  }
}

// Classic template - traditional, slightly more spacious
export const classicConfig: TemplateConfig = {
  fontSize: {
    name: 20,
    sectionHeading: 13,
    subHeading: 12,
    body: 11,
    small: 10,
  },
  spacing: {
    sectionGap: 14,
    itemGap: 8,
    lineHeight: 1.35,
    paragraphGap: 4,
    listItemGap: 2,
  },
  page: {
    marginTop: 28,
    marginBottom: 28,
    marginLeft: 36,
    marginRight: 36,
  }
}

// Modern template - clean and professional
export const modernConfig: TemplateConfig = {
  fontSize: {
    name: 22,
    sectionHeading: 13,
    subHeading: 12,
    body: 11,
    small: 10,
  },
  spacing: {
    sectionGap: 12,
    itemGap: 6,
    lineHeight: 1.3,
    paragraphGap: 4,
    listItemGap: 2,
  },
  page: {
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 32,
    marginRight: 32,
  }
}

// Minimal template - ultra compact
export const minimalConfig: TemplateConfig = {
  fontSize: {
    name: 18,
    sectionHeading: 12,
    subHeading: 11,
    body: 10,
    small: 9,
  },
  spacing: {
    sectionGap: 14,
    itemGap: 6,
    lineHeight: 1.35,
    paragraphGap: 4,
    listItemGap: 2,
  },
  page: {
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 40,
    marginRight: 40,
  }
}

// Get config by template ID
export function getConfigForTemplate(templateId: string): TemplateConfig {
  switch (templateId) {
    case 'classic':
      return classicConfig
    case 'modern':
      return modernConfig
    case 'minimal':
      return minimalConfig
    default:
      return defaultConfig
  }
}
