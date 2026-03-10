/**
 * Acceptance Tests for Story 2.1: Split-Pane Layout
 *
 * As a user
 * I want to see the editor and preview side-by-side
 * So that I can view both simultaneously while editing
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SplitPane } from './SplitPane'

describe('Story 2.1: Split-Pane Layout', () => {
  describe('Given I am on the resume editor page', () => {
    describe('When the page loads', () => {
      it('Then I should see two distinct panes: editor on the left and preview on the right', () => {
        // Given
        const leftContent = <div data-testid="editor-content">Editor Content</div>
        const rightContent = <div data-testid="preview-content">Preview Content</div>

        // When
        render(
          <SplitPane
            leftPane={leftContent}
            rightPane={rightContent}
          />
        )

        // Then
        const editorPane = screen.getByTestId('editor-pane')
        const previewPane = screen.getByTestId('preview-pane')

        expect(editorPane).toBeInTheDocument()
        expect(previewPane).toBeInTheDocument()
      })

      it('Then both panes should be visible simultaneously', () => {
        // Given
        const leftContent = <div>Editor</div>
        const rightContent = <div>Preview</div>

        // When
        render(
          <SplitPane
            leftPane={leftContent}
            rightPane={rightContent}
          />
        )

        // Then
        const editorPane = screen.getByTestId('editor-pane')
        const previewPane = screen.getByTestId('preview-pane')

        expect(editorPane).toBeVisible()
        expect(previewPane).toBeVisible()
      })

      it('Then the panes should take up approximately 50/50 width', () => {
        // Given
        const leftContent = <div>Editor</div>
        const rightContent = <div>Preview</div>

        // When
        render(
          <SplitPane
            leftPane={leftContent}
            rightPane={rightContent}
          />
        )

        // Then - both panes should have flex styling for equal width
        const editorPane = screen.getByTestId('editor-pane')
        const previewPane = screen.getByTestId('preview-pane')

        // Check for flex-1 class or similar equal width styling
        expect(editorPane.className).toMatch(/flex-1|w-1\/2|basis-1\/2/)
        expect(previewPane.className).toMatch(/flex-1|w-1\/2|basis-1\/2/)
      })

      it('Then the layout should be stable and not shift during use', () => {
        // Given
        const leftContent = <div>Editor</div>
        const rightContent = <div>Preview</div>

        // When
        render(
          <SplitPane
            leftPane={leftContent}
            rightPane={rightContent}
          />
        )

        // Then - the container should have flex layout
        const container = screen.getByTestId('split-pane-container')
        expect(container.className).toMatch(/flex/)
      })
    })

    describe('When I view the editor pane', () => {
      it('Then the editor content should be displayed on the left side', () => {
        // Given
        const editorText = 'My Resume Editor'
        const leftContent = <div>{editorText}</div>
        const rightContent = <div>Preview</div>

        // When
        render(
          <SplitPane
            leftPane={leftContent}
            rightPane={rightContent}
          />
        )

        // Then
        const editorPane = screen.getByTestId('editor-pane')
        expect(editorPane).toHaveTextContent(editorText)
      })
    })

    describe('When I view the preview pane', () => {
      it('Then the preview content should be displayed on the right side', () => {
        // Given
        const previewText = 'Rendered Preview'
        const leftContent = <div>Editor</div>
        const rightContent = <div>{previewText}</div>

        // When
        render(
          <SplitPane
            leftPane={leftContent}
            rightPane={rightContent}
          />
        )

        // Then
        const previewPane = screen.getByTestId('preview-pane')
        expect(previewPane).toHaveTextContent(previewText)
      })
    })

    describe('When both panes have content', () => {
      it('Then both panes should be functional and interactive', () => {
        // Given
        const leftContent = (
          <button data-testid="editor-button">Edit</button>
        )
        const rightContent = (
          <button data-testid="preview-button">Preview</button>
        )

        // When
        render(
          <SplitPane
            leftPane={leftContent}
            rightPane={rightContent}
          />
        )

        // Then
        const editorButton = screen.getByTestId('editor-button')
        const previewButton = screen.getByTestId('preview-button')

        expect(editorButton).toBeEnabled()
        expect(previewButton).toBeEnabled()
      })
    })
  })
})
