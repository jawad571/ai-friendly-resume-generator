/**
 * PdfExporter
 *
 * Handles exporting HTML content to PDF format.
 * Story 4.2: Export Resume as PDF
 *
 * Optimized for single-page resume output with section wrapping
 * to prevent content from being cut across pages.
 */

import html2pdf from 'html2pdf.js'

interface ExportOptions {
  filename?: string
  margin?: number | [number, number, number, number]
  pageFormat?: 'letter' | 'a4'
}

interface PdfOptions {
  margin: number | [number, number, number, number]
  filename: string
  image: { type: 'jpeg' | 'png' | 'webp'; quality: number }
  html2canvas: {
    scale: number
    useCORS: boolean
    logging: boolean
    letterRendering: boolean
  }
  jsPDF: { unit: string; format: string; orientation: 'portrait' | 'landscape' }
  pagebreak: { mode: string[]; before?: string[]; after?: string[]; avoid?: string[] }
}

export class PdfExporter {
  private defaultFilename = 'resume.pdf'

  /**
   * Export HTML element content to PDF
   */
  async exportToPdf(element: HTMLElement, options: ExportOptions = {}): Promise<boolean> {
    if (!element) {
      return false
    }

    try {
      // Clone and prepare element for PDF export
      const clone = element.cloneNode(true) as HTMLElement

      // Check if this is a Professional template (two-column layout)
      const isProfessionalTemplate = clone.querySelector('.professional-page') !== null

      // Only wrap sections for single-column templates
      if (!isProfessionalTemplate) {
        this.wrapSectionsForPdf(clone)
      }

      // Add PDF-specific class for compact styling
      clone.classList.add('pdf-export')

      const pdfOptions = this.buildOptions(options)

      await html2pdf()
        .set(pdfOptions)
        .from(clone)
        .save()

      return true
    } catch (error) {
      console.error('PDF export failed:', error)
      return false
    }
  }

  /**
   * Wrap H2 sections with their content to prevent page breaks
   * This groups each section (heading + content) together
   */
  private wrapSectionsForPdf(element: HTMLElement): void {
    const children = Array.from(element.children)
    let currentSection: HTMLDivElement | null = null
    const newChildren: Node[] = []

    children.forEach((child) => {
      const tagName = child.tagName.toLowerCase()

      if (tagName === 'h2') {
        // Start a new section
        if (currentSection) {
          newChildren.push(currentSection)
        }
        currentSection = document.createElement('div')
        currentSection.className = 'pdf-section'
        currentSection.style.cssText = 'page-break-inside: avoid; break-inside: avoid;'
        currentSection.appendChild(child.cloneNode(true))
      } else if (currentSection) {
        // Add to current section
        currentSection.appendChild(child.cloneNode(true))
      } else {
        // Before first H2 (name, contact info)
        const wrapper = document.createElement('div')
        wrapper.className = 'pdf-header'
        wrapper.style.cssText = 'page-break-inside: avoid; break-inside: avoid;'
        wrapper.appendChild(child.cloneNode(true))
        newChildren.push(wrapper)
      }
    })

    // Don't forget the last section
    if (currentSection) {
      newChildren.push(currentSection)
    }

    // Replace content
    element.innerHTML = ''
    newChildren.forEach((node) => element.appendChild(node))
  }

  /**
   * Get default PDF export options optimized for resumes
   */
  getDefaultOptions(): PdfOptions {
    return {
      // Tight margins [top, left, bottom, right] in mm
      margin: [8, 10, 8, 10] as [number, number, number, number],
      filename: this.defaultFilename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'letter',
        orientation: 'portrait',
      },
      // Page break control
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        avoid: ['.pdf-section', '.pdf-header', '.professional-section', '.job-entry', 'h1', 'h2', 'h3'],
      },
    }
  }

  private buildOptions(options: ExportOptions): PdfOptions {
    const defaults = this.getDefaultOptions()

    return {
      ...defaults,
      filename: options.filename || defaults.filename,
      margin: options.margin ?? defaults.margin,
      jsPDF: {
        ...defaults.jsPDF,
        format: options.pageFormat || 'letter',
      },
    }
  }
}
