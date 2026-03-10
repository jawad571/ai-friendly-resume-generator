/**
 * TemplateSelector Component
 *
 * Allows users to view and select from available resume templates.
 * Story 3.2: View Available Templates
 */

import React from 'react'
import { TemplateThumbnail } from './TemplateThumbnail'

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
  isOpen: boolean
  onToggle: () => void
}

const templates = [
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'minimal', name: 'Minimal' },
]

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  isOpen,
  onToggle,
}: TemplateSelectorProps): React.ReactElement {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="px-4 py-2 rounded font-medium bg-gray-600 hover:bg-gray-700 text-white"
      >
        Template
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Select Template</h3>
            <button
              onClick={onToggle}
              aria-label="Close"
              className="text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>

          <div role="listbox" className="grid grid-cols-3 gap-3">
            {templates.map((template) => (
              <TemplateThumbnail
                key={template.id}
                templateId={template.id}
                templateName={template.name}
                isSelected={selectedTemplate === template.id}
                onClick={onSelectTemplate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
