/**
 * MarkdownPreview Component
 *
 * Renders Markdown content as formatted HTML.
 * Story 2.2: Basic HTML Preview Rendering
 */

import React, { useMemo } from 'react'
import { marked } from 'marked'

interface MarkdownPreviewProps {
  content: string
  templateClassName?: string
}

export function MarkdownPreview({ content, templateClassName = '' }: MarkdownPreviewProps): React.ReactElement {
  const html = useMemo(() => {
    if (!content) {
      return ''
    }
    return marked.parse(content, { async: false }) as string
  }, [content])

  return (
    <div
      role="region"
      aria-label="preview"
      data-testid="preview"
      className={`h-full overflow-auto bg-white ${templateClassName}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
