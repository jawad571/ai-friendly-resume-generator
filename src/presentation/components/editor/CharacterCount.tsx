/**
 * CharacterCount Component
 *
 * Displays character and word count for the resume content.
 * Story 6.1: Character Count
 */

import React, { useMemo } from 'react'

interface CharacterCountProps {
  content: string
}

function countWords(text: string): number {
  if (!text || text.trim().length === 0) {
    return 0
  }
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

export function CharacterCount({ content }: CharacterCountProps): React.ReactElement {
  const stats = useMemo(() => {
    const characters = content.length
    const words = countWords(content)
    return { characters, words }
  }, [content])

  return (
    <div className="text-xs text-gray-500 flex gap-4">
      <span>{stats.characters} characters</span>
      <span>{stats.words} words</span>
    </div>
  )
}
