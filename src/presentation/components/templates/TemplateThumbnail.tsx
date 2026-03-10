/**
 * TemplateThumbnail Component
 *
 * A clickable thumbnail showing a template preview.
 * Part of Story 3.2: View Available Templates
 */

import React from 'react'

interface TemplateThumbnailProps {
  templateId: string
  templateName: string
  isSelected: boolean
  onClick: (templateId: string) => void
}

export function TemplateThumbnail({
  templateId,
  templateName,
  isSelected,
  onClick,
}: TemplateThumbnailProps): React.ReactElement {
  return (
    <div
      role="option"
      aria-label={templateName}
      aria-selected={isSelected}
      onClick={() => onClick(templateId)}
      className={`
        cursor-pointer p-3 rounded-lg border-2 transition-all
        ${isSelected
          ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
        }
      `}
    >
      <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
        <div className="w-10 h-12 bg-white border border-gray-300 rounded shadow-sm" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-center text-gray-700">{templateName}</p>
    </div>
  )
}
