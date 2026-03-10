/**
 * ProfessionalPreview Component
 *
 * Renders markdown content in a two-column layout matching template.html
 * Sidebar (30%): Skills, Languages, Affiliations, Certifications
 * Main (70%): Name, Contact, Profile, Experience, Education, etc.
 */

import React, { useMemo } from 'react'
import { marked } from 'marked'

interface ProfessionalPreviewProps {
  content: string
}

interface Section {
  title: string
  content: string
}

// Sections that go in the sidebar
const SIDEBAR_SECTIONS = ['skills', 'languages', 'affiliations', 'certifications', 'interests', 'hobbies']

function parseMarkdownSections(markdown: string): {
  header: { name: string; subtitle: string; contact: string }
  sidebarSections: Section[]
  mainSections: Section[]
} {
  const lines = markdown.split('\n')
  const sections: Section[] = []
  let headerName = ''
  let headerSubtitle = ''
  let headerContact = ''
  let currentSection: Section | null = null
  let inHeader = true

  for (const line of lines) {
    // H1 - Name
    if (line.startsWith('# ')) {
      headerName = line.slice(2).trim()
      continue
    }

    // H2 - Section start
    if (line.startsWith('## ')) {
      inHeader = false
      if (currentSection) {
        sections.push(currentSection)
      }
      currentSection = {
        title: line.slice(3).trim(),
        content: '',
      }
      continue
    }

    // Content before first H2 is header info
    if (inHeader && line.trim()) {
      // Check if it looks like a subtitle (short, no special chars)
      if (!headerSubtitle && line.trim().length < 50 && !line.includes('|') && !line.includes('@') && !line.includes('http')) {
        headerSubtitle = line.trim()
      } else {
        // Contact info line
        headerContact += (headerContact ? '\n' : '') + line.trim()
      }
      continue
    }

    // Add content to current section
    if (currentSection) {
      currentSection.content += line + '\n'
    }
  }

  // Don't forget the last section
  if (currentSection) {
    sections.push(currentSection)
  }

  // Split sections into sidebar and main
  const sidebarSections: Section[] = []
  const mainSections: Section[] = []

  for (const section of sections) {
    const titleLower = section.title.toLowerCase()
    const isSidebar = SIDEBAR_SECTIONS.some(s => titleLower.includes(s))
    if (isSidebar) {
      sidebarSections.push(section)
    } else {
      mainSections.push(section)
    }
  }

  return {
    header: { name: headerName, subtitle: headerSubtitle, contact: headerContact },
    sidebarSections,
    mainSections,
  }
}

function renderSectionContent(content: string): string {
  return marked.parse(content.trim(), { async: false }) as string
}

function parseContactInfo(contact: string): { location?: string; phone?: string; email?: string; linkedin?: string; other: string[] } {
  const result: { location?: string; phone?: string; email?: string; linkedin?: string; other: string[] } = { other: [] }

  const parts = contact.split(/[|\n]/).map(p => p.trim()).filter(Boolean)

  for (const part of parts) {
    const lower = part.toLowerCase()
    if (lower.includes('@') && (lower.includes('.com') || lower.includes('.org') || lower.includes('.net') || lower.includes('.edu'))) {
      result.email = part
    } else if (lower.includes('linkedin')) {
      result.linkedin = part
    } else if (/^\+?[\d\s()-]+$/.test(part.replace(/\s/g, '')) || lower.includes('phone')) {
      result.phone = part
    } else if (lower.includes(',') || lower.includes('city') || lower.includes('state') || /[A-Z]{2}\s*\d{5}/.test(part)) {
      result.location = part
    } else if (part.length > 0) {
      // Could be location if it's short
      if (part.length < 40 && !result.location) {
        result.location = part
      } else {
        result.other.push(part)
      }
    }
  }

  return result
}

export function ProfessionalPreview({ content }: ProfessionalPreviewProps): React.ReactElement {
  const { header, sidebarSections, mainSections } = useMemo(() => {
    if (!content) {
      return { header: { name: '', subtitle: '', contact: '' }, sidebarSections: [], mainSections: [] }
    }
    return parseMarkdownSections(content)
  }, [content])

  const contactInfo = useMemo(() => parseContactInfo(header.contact), [header.contact])

  if (!content) {
    return <div className="template-professional-wrapper h-full bg-white" />
  }

  return (
    <div
      role="region"
      aria-label="preview"
      data-testid="preview"
      className="template-professional-wrapper h-full overflow-auto"
    >
      <div className="professional-page">
        {/* Sidebar - Left Column */}
        <div className="professional-sidebar">
          {sidebarSections.map((section, idx) => (
            <div key={idx} className="professional-section">
              <div className="professional-section-title">{section.title}</div>
              <div
                className="professional-section-content"
                dangerouslySetInnerHTML={{ __html: renderSectionContent(section.content) }}
              />
            </div>
          ))}
        </div>

        {/* Main - Right Column */}
        <div className="professional-main">
          {/* Header */}
          <h1 className="professional-name">{header.name}</h1>
          {header.subtitle && <div className="professional-subtitle">{header.subtitle}</div>}

          {/* Contact Info */}
          <div className="professional-contact">
            {contactInfo.location && (
              <div className="professional-contact-item">
                <span className="material-icons">location_on</span>
                {contactInfo.location}
              </div>
            )}
            {contactInfo.phone && (
              <div className="professional-contact-item">
                <span className="material-icons">phone</span>
                {contactInfo.phone}
              </div>
            )}
            {contactInfo.email && (
              <div className="professional-contact-item">
                <span className="material-icons">email</span>
                {contactInfo.email}
              </div>
            )}
            {contactInfo.linkedin && (
              <div className="professional-contact-item">
                <span className="material-icons">link</span>
                {contactInfo.linkedin}
              </div>
            )}
            {contactInfo.other.map((item, idx) => (
              <div key={idx} className="professional-contact-item">{item}</div>
            ))}
          </div>

          {/* Main Sections */}
          {mainSections.map((section, idx) => (
            <div key={idx} className="professional-section">
              <div className="professional-section-title">{section.title}</div>
              <div
                className="professional-section-content"
                dangerouslySetInnerHTML={{ __html: renderSectionContent(section.content) }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
