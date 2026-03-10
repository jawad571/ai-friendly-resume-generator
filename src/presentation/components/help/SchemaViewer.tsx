/**
 * SchemaViewer Component
 *
 * Story 5.1: Access Schema Template
 * Displays the resume markdown schema template in a readable format.
 */

import { resumeSchemaTemplate } from '../../../schema/resume-schema-template'

export function SchemaViewer() {
  return (
    <pre
      data-testid="schema-content"
      className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded border overflow-auto"
    >
      {resumeSchemaTemplate}
    </pre>
  )
}
