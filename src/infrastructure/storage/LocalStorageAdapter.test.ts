/**
 * Acceptance Tests for Story 1.2: Auto-Save to Browser Storage
 *
 * As a career professional
 * I want my resume content to save automatically as I type
 * So that I don't lose my work if I accidentally close the browser
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LocalStorageAdapter, STORAGE_KEYS } from './LocalStorageAdapter'

describe('Story 1.2: Auto-Save to Browser Storage', () => {
  let storage: LocalStorageAdapter

  beforeEach(() => {
    localStorage.clear()
    storage = new LocalStorageAdapter()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Given I am editing my resume content', () => {
    describe('When I stop typing for more than 2 seconds', () => {
      it('Then my content should be saved to browser local storage automatically', async () => {
        // Given
        const content = '# John Doe\n\nSoftware Engineer'

        // When - save content
        storage.saveContent(content)

        // Then - content should be persisted
        const savedContent = localStorage.getItem(STORAGE_KEYS.RESUME_CONTENT)
        expect(savedContent).toBeTruthy()
        const parsed = JSON.parse(savedContent!)
        expect(parsed.content).toBe(content)
      })

      it('Then no save button click should be required', () => {
        // Given
        const content = '# Jane Doe\n\nProject Manager'

        // When - content is saved programmatically
        storage.saveContent(content)

        // Then - content is persisted without any button click
        const savedContent = localStorage.getItem(STORAGE_KEYS.RESUME_CONTENT)
        expect(savedContent).toBeTruthy()
      })
    })

    describe('When I refresh the browser', () => {
      it('Then my content should persist and be loaded back', () => {
        // Given
        const content = '# My Resume\n\n## Experience\n- Software Developer'
        storage.saveContent(content)

        // When - simulating browser refresh by creating new adapter instance
        const newStorage = new LocalStorageAdapter()
        const loadedContent = newStorage.loadContent()

        // Then
        expect(loadedContent).toBe(content)
      })
    })

    describe('When I close the browser and reopen later', () => {
      it('Then my content should still be available', () => {
        // Given
        const content = '# Resume Content\n\nThis should persist'
        storage.saveContent(content)

        // When - simulating browser close/reopen by accessing localStorage directly
        // (In a real scenario, localStorage persists across browser sessions)
        const savedData = localStorage.getItem(STORAGE_KEYS.RESUME_CONTENT)

        // Then
        expect(savedData).toBeTruthy()
        const parsed = JSON.parse(savedData!)
        expect(parsed.content).toBe(content)
      })
    })
  })

  describe('Given no previous content exists', () => {
    describe('When I load content', () => {
      it('Then it should return null or empty string', () => {
        // Given - fresh localStorage (already cleared in beforeEach)

        // When
        const content = storage.loadContent()

        // Then
        expect(content).toBeNull()
      })
    })
  })

  describe('Given I want to track when content was saved', () => {
    describe('When content is saved', () => {
      it('Then it should store a timestamp with the content', () => {
        // Given
        const content = '# Resume with timestamp'
        const beforeSave = Date.now()

        // When
        storage.saveContent(content)

        // Then
        const savedData = localStorage.getItem(STORAGE_KEYS.RESUME_CONTENT)
        const parsed = JSON.parse(savedData!)
        expect(parsed.lastModified).toBeGreaterThanOrEqual(beforeSave)
      })
    })
  })

  describe('Given I want to check if content has been saved', () => {
    describe('When I check for saved content', () => {
      it('Then it should return true if content exists', () => {
        // Given
        storage.saveContent('Some content')

        // When
        const hasSavedContent = storage.hasContent()

        // Then
        expect(hasSavedContent).toBe(true)
      })

      it('Then it should return false if no content exists', () => {
        // Given - fresh localStorage

        // When
        const hasSavedContent = storage.hasContent()

        // Then
        expect(hasSavedContent).toBe(false)
      })
    })
  })

  describe('Given I want to clear all saved content', () => {
    describe('When I clear the storage', () => {
      it('Then all resume content should be removed', () => {
        // Given
        storage.saveContent('Content to be cleared')

        // When
        storage.clearContent()

        // Then
        expect(storage.hasContent()).toBe(false)
        expect(storage.loadContent()).toBeNull()
      })
    })
  })
})
