/**
 * ExportButton Component
 *
 * A button to trigger PDF export of the resume with custom filename support.
 * Story 4.1: Export Button Available
 * Story 3.8: Custom Filename Export
 */

import React, { useCallback } from 'react'

const DEFAULT_FILENAME = 'Resume.pdf'

interface ExportButtonProps {
  onExport: (filename: string) => void
  isExporting?: boolean
}

function ensurePdfExtension(filename: string): string {
  if (!filename.toLowerCase().endsWith('.pdf')) {
    return `${filename}.pdf`
  }
  return filename
}

export function ExportButton({ onExport, isExporting = false }: ExportButtonProps): React.ReactElement {
  const handleClick = useCallback(() => {
    const userFilename = prompt('Enter filename for your resume:', DEFAULT_FILENAME)

    // If user cancelled (null) or prompt not supported (undefined), don't proceed
    if (userFilename === null || userFilename === undefined) {
      return
    }

    // Use default if empty, otherwise ensure .pdf extension
    const filename = userFilename.trim() === ''
      ? DEFAULT_FILENAME
      : ensurePdfExtension(userFilename.trim())

    onExport(filename)
  }, [onExport])

  return (
    <button
      onClick={handleClick}
      disabled={isExporting}
      className={`
        px-4 py-2 rounded font-medium
        ${isExporting
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
        }
      `}
    >
      {isExporting ? 'Generating PDF...' : 'Export PDF'}
    </button>
  )
}
