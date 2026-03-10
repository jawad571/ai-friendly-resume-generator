/**
 * SplitPane Component
 *
 * A layout component that displays two panes side-by-side with independent scrolling.
 * Story 2.1: Split-Pane Layout
 * Story 3.9: Independent Scrolling
 */

import React from 'react'

interface SplitPaneProps {
  leftPane: React.ReactNode
  rightPane: React.ReactNode
}

export function SplitPane({ leftPane, rightPane }: SplitPaneProps): React.ReactElement {
  return (
    <div
      data-testid="split-pane-container"
      className="flex h-full w-full overflow-hidden"
    >
      <div
        data-testid="editor-pane"
        className="w-1/2 h-full overflow-auto bg-gray-900"
      >
        {leftPane}
      </div>
      <div
        data-testid="preview-pane"
        className="w-1/2 h-full overflow-auto bg-gray-100 shadow-inner"
      >
        {rightPane}
      </div>
    </div>
  )
}
