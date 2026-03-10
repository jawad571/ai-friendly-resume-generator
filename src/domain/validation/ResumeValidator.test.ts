/**
 * Acceptance Tests for Story 5.1: Schema Validation
 *
 * As a job seeker
 * I want my resume content to be validated against a schema
 * So that I know if my resume follows the expected format
 */

import { describe, it, expect } from 'vitest'
import { ResumeValidator, type ValidationError, type ValidationWarning } from './ResumeValidator'

describe('Story 5.1: Schema Validation', () => {
  const validator = new ResumeValidator()

  describe('Given a valid resume with all required sections', () => {
    const validResume = `# John Doe

Email: john@example.com | Phone: (555) 123-4567

## Summary
Experienced software engineer with 5+ years in web development.

## Experience

### Senior Software Engineer | Acme Corp | 2020 - Present
- Led development of customer-facing web applications

## Education

### B.S. Computer Science | State University | 2018

## Skills
- JavaScript, TypeScript, React`

    describe('When the resume is validated', () => {
      it('Then it should return a valid result', () => {
        // Given
        const result = validator.validate(validResume)

        // Then
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })
    })
  })

  describe('Given a resume missing the name/title', () => {
    const missingName = `## Summary
Just a summary without a name heading.

## Experience
### Job | Company | Date`

    describe('When the resume is validated', () => {
      it('Then it should return an error about missing name', () => {
        // Given
        const result = validator.validate(missingName)

        // Then
        expect(result.isValid).toBe(false)
        expect(result.errors.some((e: ValidationError) => e.message.toLowerCase().includes('name') || e.message.toLowerCase().includes('title'))).toBe(true)
      })
    })
  })

  describe('Given a resume missing key sections', () => {
    const missingExperience = `# John Doe

## Summary
A summary.

## Education
### B.S. Computer Science | State University | 2018`

    describe('When the resume is validated', () => {
      it('Then it should return warnings about missing sections', () => {
        // Given
        const result = validator.validate(missingExperience)

        // Then
        expect(result.warnings.some((w: ValidationWarning) => w.message.toLowerCase().includes('experience'))).toBe(true)
      })
    })
  })

  describe('Given an empty resume', () => {
    describe('When the resume is validated', () => {
      it('Then it should return an error about empty content', () => {
        // Given
        const result = validator.validate('')

        // Then
        expect(result.isValid).toBe(false)
        expect(result.errors.some((e: ValidationError) => e.message.toLowerCase().includes('empty'))).toBe(true)
      })
    })
  })

  describe('Given a resume with only whitespace', () => {
    describe('When the resume is validated', () => {
      it('Then it should return an error about empty content', () => {
        // Given
        const result = validator.validate('   \n\n   ')

        // Then
        expect(result.isValid).toBe(false)
      })
    })
  })
})

describe('ValidationResult type', () => {
  it('should contain isValid, errors, and warnings properties', () => {
    // Given
    const validator = new ResumeValidator()
    const result = validator.validate('# Test')

    // Then
    expect(result).toHaveProperty('isValid')
    expect(result).toHaveProperty('errors')
    expect(result).toHaveProperty('warnings')
    expect(Array.isArray(result.errors)).toBe(true)
    expect(Array.isArray(result.warnings)).toBe(true)
  })
})
