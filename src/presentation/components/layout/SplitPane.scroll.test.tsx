/**
 * Acceptance Tests for Story 3.9: Independent Scrolling
 *
 * As a job seeker
 * I want the editor and preview to scroll independently
 * So that I can navigate long resumes easily
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SplitPane } from './SplitPane'

describe('Story 3.9: Independent Scrolling', () => {
  describe('Given the editor and preview panes exist', () => {
    describe('When the panes are rendered', () => {
      it('Then the editor pane should have overflow-auto for independent scrolling', () => {
        // Given
        render(
          <SplitPane
            leftPane={<div data-testid="left-content">Left Content</div>}
            rightPane={<div data-testid="right-content">Right Content</div>}
          />
        )

        // Then
        const editorPane = screen.getByTestId('editor-pane')
        expect(editorPane.className).toMatch(/overflow-auto|overflow-y-auto/)
      })

      it('Then the preview pane should have overflow-auto for independent scrolling', () => {
        // Given
        render(
          <SplitPane
            leftPane={<div data-testid="left-content">Left Content</div>}
            rightPane={<div data-testid="right-content">Right Content</div>}
          />
        )

        // Then
        const previewPane = screen.getByTestId('preview-pane')
        expect(previewPane.className).toMatch(/overflow-auto|overflow-y-auto/)
      })

      it('Then each pane should be scrollable independently', () => {
        // Given
        render(
          <SplitPane
            leftPane={<div data-testid="left-content">Left Content</div>}
            rightPane={<div data-testid="right-content">Right Content</div>}
          />
        )

        // Then - both panes should have overflow handling
        const editorPane = screen.getByTestId('editor-pane')
        const previewPane = screen.getByTestId('preview-pane')

        expect(editorPane.className).toMatch(/overflow/)
        expect(previewPane.className).toMatch(/overflow/)
      })

      it('Then the container should not have shared scrolling', () => {
        // Given
        render(
          <SplitPane
            leftPane={<div data-testid="left-content">Left Content</div>}
            rightPane={<div data-testid="right-content">Right Content</div>}
          />
        )

        // Then - container should have overflow-hidden to prevent shared scrolling
        const container = screen.getByTestId('split-pane-container')
        expect(container.className).toMatch(/overflow-hidden/)
      })
    })

    describe('When content is long', () => {
      it('Then the editor pane should be able to scroll its content', () => {
        // Given
        const longContent = Array(100).fill('Line').join('\n')
        render(
          <SplitPane
            leftPane={<div style={{ height: '2000px' }}>{longContent}</div>}
            rightPane={<div>Short</div>}
          />
        )

        // Then - editor pane should have scrollable styles
        const editorPane = screen.getByTestId('editor-pane')
        expect(editorPane.className).toMatch(/overflow/)
        expect(editorPane.className).toMatch(/h-full/)
      })

      it('Then the preview pane should be able to scroll its content', () => {
        // Given
        const longContent = Array(100).fill('Line').join('\n')
        render(
          <SplitPane
            leftPane={<div>Short</div>}
            rightPane={<div style={{ height: '2000px' }}>{longContent}</div>}
          />
        )

        // Then - preview pane should have scrollable styles
        const previewPane = screen.getByTestId('preview-pane')
        expect(previewPane.className).toMatch(/overflow/)
        expect(previewPane.className).toMatch(/h-full/)
      })
    })
  })
})
