/**
 * Resume Validator
 *
 * Validates resume markdown content against expected schema.
 * Story 5.1: Schema Validation
 */

export interface ValidationError {
  type: 'error'
  message: string
  line?: number
}

export interface ValidationWarning {
  type: 'warning'
  message: string
  line?: number
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export class ResumeValidator {
  private readonly requiredSections = ['Experience', 'Skills']
  private readonly recommendedSections = ['Summary', 'Education']

  validate(content: string): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // Check for empty content
    if (!content || content.trim().length === 0) {
      errors.push({
        type: 'error',
        message: 'Resume content is empty. Please add content to your resume.',
      })
      return { isValid: false, errors, warnings }
    }

    const lines = content.split('\n')

    // Check for name/title (h1 heading)
    const hasName = lines.some((line) => line.trim().startsWith('# '))
    if (!hasName) {
      errors.push({
        type: 'error',
        message: 'Missing name/title. Your resume should start with a heading (# Your Name).',
      })
    }

    // Check for required sections (h2 headings)
    const sectionHeaders = lines
      .filter((line) => line.trim().startsWith('## '))
      .map((line) => line.replace('## ', '').trim().toLowerCase())

    // Check required sections
    for (const section of this.requiredSections) {
      const found = sectionHeaders.some(
        (header) => header.toLowerCase().includes(section.toLowerCase())
      )
      if (!found) {
        warnings.push({
          type: 'warning',
          message: `Missing "${section}" section. Consider adding a ${section} section to your resume.`,
        })
      }
    }

    // Check recommended sections
    for (const section of this.recommendedSections) {
      const found = sectionHeaders.some(
        (header) => header.toLowerCase().includes(section.toLowerCase())
      )
      if (!found) {
        warnings.push({
          type: 'warning',
          message: `Consider adding a "${section}" section to strengthen your resume.`,
        })
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }
}
