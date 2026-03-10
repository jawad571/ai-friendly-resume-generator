/**
 * MarkdownEditor Component
 *
 * A text editing area for writing resume content in Markdown syntax.
 * Story 1.1: Plain Text Markdown Entry
 */

import React from 'react'

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
}

export function MarkdownEditor({ content, onChange }: MarkdownEditorProps): React.ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <textarea
      aria-label="editor"
      value={content}
      onChange={handleChange}
      placeholder="# Your Name&#10;&#10;email@example.com | (555) 123-4567 | City, State&#10;&#10;## Summary&#10;&#10;Write a brief professional summary here...&#10;&#10;## Experience&#10;&#10;### Job Title | Company Name&#10;**Jan 2020 - Present** | Location&#10;&#10;- Achievement or responsibility&#10;- Another accomplishment&#10;&#10;## Education&#10;&#10;### Degree | University Name&#10;**Graduation Year**&#10;&#10;## Skills&#10;&#10;- Skill 1, Skill 2, Skill 3"
      className="w-full h-full p-5 font-mono text-sm resize-none border-0 focus:outline-none focus:ring-0 bg-gray-900 text-gray-100 placeholder-gray-500 leading-relaxed"
      style={{ fontSize: '14px', lineHeight: '1.6' }}
      spellCheck={false}
    />
  )
}
