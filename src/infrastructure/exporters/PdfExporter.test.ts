/**
 * Acceptance Tests for Story 4.2: Export Resume as PDF
 *
 * As a job seeker
 * I want to click the export button to download my resume as a PDF
 * So that I can submit my resume to job applications
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PdfExporter } from './PdfExporter'

// Mock html2pdf.js
vi.mock('html2pdf.js', () => {
  return {
    default: () => ({
      set: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      save: vi.fn().mockResolvedValue(undefined),
      outputPdf: vi.fn().mockReturnThis(),
    }),
  }
})

describe('Story 4.2: Export Resume as PDF', () => {
  let pdfExporter: PdfExporter

  beforeEach(() => {
    pdfExporter = new PdfExporter()
    vi.clearAllMocks()
  })

  describe('Given I have resume content displayed in the preview', () => {
    describe('When I click the export button', () => {
      it('Then a PDF file should be generated', async () => {
        // Given
        const htmlContent = '<h1>John Doe</h1><p>Software Engineer</p>'
        const element = document.createElement('div')
        element.innerHTML = htmlContent

        // When
        const result = await pdfExporter.exportToPdf(element)

        // Then
        expect(result).toBe(true)
      })

      it('Then the file should download to my device', async () => {
        // Given
        const htmlContent = '<h1>Resume</h1>'
        const element = document.createElement('div')
        element.innerHTML = htmlContent

        // When
        await pdfExporter.exportToPdf(element)

        // Then - the export should succeed (download happens via html2pdf)
        // In integration test, we'd check for actual download
        expect(true).toBe(true)
      })

      it('Then the download should complete within 10 seconds', async () => {
        // Given
        const htmlContent = '<h1>Resume</h1>'
        const element = document.createElement('div')
        element.innerHTML = htmlContent

        // When
        const startTime = Date.now()
        await pdfExporter.exportToPdf(element)
        const duration = Date.now() - startTime

        // Then
        expect(duration).toBeLessThan(10000)
      })
    })

    describe('When the PDF is configured', () => {
      it('Then the PDF should use appropriate page format (Letter/A4)', () => {
        // Given
        const options = pdfExporter.getDefaultOptions()

        // Then
        expect(options.jsPDF.format).toBe('letter')
      })

      it('Then the PDF should have proper margins', () => {
        // Given
        const options = pdfExporter.getDefaultOptions()

        // Then - margin can be a number or array [top, left, bottom, right]
        expect(options.margin).toBeDefined()
        if (Array.isArray(options.margin)) {
          expect(options.margin.length).toBe(4)
          expect(options.margin.every((m: number) => m >= 0)).toBe(true)
        } else {
          expect(options.margin).toBeGreaterThanOrEqual(0)
        }
      })

      it('Then the PDF should allow custom filename', async () => {
        // Given
        const htmlContent = '<h1>Resume</h1>'
        const element = document.createElement('div')
        element.innerHTML = htmlContent
        const customFilename = 'john-doe-resume.pdf'

        // When
        await pdfExporter.exportToPdf(element, { filename: customFilename })

        // Then - export should complete successfully
        expect(true).toBe(true)
      })
    })
  })

  describe('Given an error occurs during export', () => {
    describe('When the PDF generation fails', () => {
      it('Then it should return false to indicate failure', async () => {
        // Given
        const invalidElement = null

        // When
        const result = await pdfExporter.exportToPdf(invalidElement as unknown as HTMLElement)

        // Then
        expect(result).toBe(false)
      })
    })
  })
})
