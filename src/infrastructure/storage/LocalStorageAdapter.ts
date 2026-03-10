/**
 * LocalStorageAdapter
 *
 * Handles persistence of resume content to browser localStorage.
 * Story 1.2: Auto-Save to Browser Storage
 */

export const STORAGE_KEYS = {
  RESUME_CONTENT: 'resume:content',
  SELECTED_TEMPLATE: 'resume:selectedTemplate',
  USER_PREFERENCES: 'resume:preferences',
} as const

interface StoredResumeData {
  content: string
  lastModified: number
  version: string
}

export class LocalStorageAdapter {
  private readonly version = '1.0'

  /**
   * Save resume content to localStorage
   */
  saveContent(content: string): void {
    const data: StoredResumeData = {
      content,
      lastModified: Date.now(),
      version: this.version,
    }
    localStorage.setItem(STORAGE_KEYS.RESUME_CONTENT, JSON.stringify(data))
  }

  /**
   * Load resume content from localStorage
   * Returns null if no content exists
   */
  loadContent(): string | null {
    const savedData = localStorage.getItem(STORAGE_KEYS.RESUME_CONTENT)
    if (!savedData) {
      return null
    }

    try {
      const parsed: StoredResumeData = JSON.parse(savedData)
      return parsed.content
    } catch {
      return null
    }
  }

  /**
   * Check if content exists in localStorage
   */
  hasContent(): boolean {
    return localStorage.getItem(STORAGE_KEYS.RESUME_CONTENT) !== null
  }

  /**
   * Clear all resume content from localStorage
   */
  clearContent(): void {
    localStorage.removeItem(STORAGE_KEYS.RESUME_CONTENT)
  }

  /**
   * Get the last modified timestamp
   */
  getLastModified(): number | null {
    const savedData = localStorage.getItem(STORAGE_KEYS.RESUME_CONTENT)
    if (!savedData) {
      return null
    }

    try {
      const parsed: StoredResumeData = JSON.parse(savedData)
      return parsed.lastModified
    } catch {
      return null
    }
  }
}
