/**
 * ImportExportButtons Component
 *
 * Provides buttons for importing and exporting resume content as markdown files.
 * Story 4.4: Import/Export Markdown
 * Story 4.5: Data Loss Warning
 */

import React, { useCallback, useRef } from 'react'

interface ImportExportButtonsProps {
  content: string
  onImport: (content: string) => void
  hasUnsavedChanges?: boolean
}

export function ImportExportButtons({
  content,
  onImport,
  hasUnsavedChanges = false,
}: ImportExportButtonsProps): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = useCallback(() => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'resume.md'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [content])

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Warn about unsaved changes
      if (hasUnsavedChanges) {
        const confirmed = confirm(
          'You have unsaved changes. Importing a new file will replace your current content. Do you want to continue?'
        )
        if (!confirmed) {
          // Reset file input
          event.target.value = ''
          return
        }
      }

      try {
        const text = await file.text()
        onImport(text)
      } catch (error) {
        console.error('Error reading file:', error)
      }

      // Reset file input so the same file can be selected again
      event.target.value = ''
    },
    [onImport, hasUnsavedChanges]
  )

  return (
    <div className="flex gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,text/markdown"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Import markdown file"
      />
      <button
        onClick={handleImportClick}
        className="px-3 py-2 rounded font-medium bg-gray-600 hover:bg-gray-700 text-white text-sm"
        aria-label="Import Markdown"
      >
        Import MD
      </button>
      <button
        onClick={handleExport}
        className="px-3 py-2 rounded font-medium bg-gray-600 hover:bg-gray-700 text-white text-sm"
        aria-label="Export Markdown"
      >
        Export MD
      </button>
    </div>
  )
}
