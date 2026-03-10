/**
 * HelpPanel Component
 *
 * Story 5.1: Access Schema Template
 * Story 5.2: Copy Schema to Clipboard
 * Story 5.3: View LLM Workflow Instructions
 * Story 6.4: View Schema Documentation
 * Story 6.5: View Example Resume
 *
 * Main help panel with tabs for schema, workflow, documentation, and example.
 */

import { useState } from 'react'
import { SchemaViewer } from './SchemaViewer'
import { resumeSchemaTemplate } from '../../../schema/resume-schema-template'
import { exampleResume } from '../../../schema/example-resume'

interface HelpPanelProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = 'schema' | 'workflow' | 'documentation' | 'example'

export function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('schema')
  const [copyMessage, setCopyMessage] = useState<string | null>(null)

  if (!isOpen) {
    return null
  }

  const handleCopySchema = async () => {
    try {
      await navigator.clipboard.writeText(resumeSchemaTemplate)
      setCopyMessage('Schema copied!')
      setTimeout(() => setCopyMessage(null), 2000)
    } catch (err) {
      setCopyMessage('Failed to copy')
      setTimeout(() => setCopyMessage(null), 2000)
    }
  }

  const handleCopyExample = async () => {
    try {
      await navigator.clipboard.writeText(exampleResume)
      setCopyMessage('Example copied!')
      setTimeout(() => setCopyMessage(null), 2000)
    } catch (err) {
      setCopyMessage('Failed to copy')
      setTimeout(() => setCopyMessage(null), 2000)
    }
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'schema', label: 'Schema Template' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'example', label: 'Example' },
  ]

  return (
    <div
      data-testid="help-panel"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Help & Documentation</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded hover:bg-gray-100"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'schema' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Resume Schema Template</h3>
                <div className="flex items-center gap-2">
                  {copyMessage && (
                    <span className="text-green-600 text-sm">{copyMessage}</span>
                  )}
                  <button
                    onClick={handleCopySchema}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Copy Schema
                  </button>
                </div>
              </div>
              <SchemaViewer />
            </div>
          )}

          {activeTab === 'workflow' && (
            <div data-testid="workflow-content">
              <h3 className="text-lg font-semibold mb-4">AI-Friendly Workflow Guide</h3>
              <p className="mb-4 text-gray-700">
                This tool is designed to work WITH external LLMs like ChatGPT, Claude, or Gemini
                to help you create professional resumes. Follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-4">
                <li className="text-gray-800">
                  <strong>Step 1: Copy the Schema Template</strong>
                  <p className="ml-6 text-gray-600">
                    Go to the Schema Template tab and click "Copy Schema" to get the resume format.
                  </p>
                </li>
                <li className="text-gray-800">
                  <strong>Step 2: Provide Your Information to an LLM</strong>
                  <p className="ml-6 text-gray-600">
                    Paste the schema into ChatGPT, Claude, or Gemini along with your raw experience,
                    skills, and education. Ask the AI to format your information using the schema.
                  </p>
                </li>
                <li className="text-gray-800">
                  <strong>Step 3: Copy the LLM Output</strong>
                  <p className="ml-6 text-gray-600">
                    Once the AI generates your formatted resume, copy the markdown output.
                  </p>
                </li>
                <li className="text-gray-800">
                  <strong>Step 4: Paste into the Editor</strong>
                  <p className="ml-6 text-gray-600">
                    Paste the formatted resume into the editor on the left. You'll see a live
                    preview on the right.
                  </p>
                </li>
                <li className="text-gray-800">
                  <strong>Step 5: Review and Export</strong>
                  <p className="ml-6 text-gray-600">
                    Review the preview, make any final edits, and export to PDF when ready.
                  </p>
                </li>
              </ol>
              <div className="mt-6 p-4 bg-blue-50 rounded">
                <h4 className="font-semibold text-blue-800">Compatible LLMs:</h4>
                <ul className="mt-2 text-blue-700">
                  <li>- ChatGPT (OpenAI)</li>
                  <li>- Claude (Anthropic)</li>
                  <li>- Gemini (Google)</li>
                  <li>- Any LLM that can format text as Markdown</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'documentation' && (
            <div data-testid="documentation-content">
              <h3 className="text-lg font-semibold mb-4">Schema Documentation</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-700 mb-2">Required Sections</h4>
                <p className="text-gray-600 mb-2">These sections should be included in every resume:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Contact:</strong> Your name, email, phone, and location. LinkedIn and GitHub are recommended.</li>
                  <li><strong>Summary:</strong> A brief 2-3 sentence professional summary highlighting your experience and goals.</li>
                  <li><strong>Experience:</strong> Your work history with job titles, companies, dates, and bullet points describing achievements.</li>
                  <li><strong>Education:</strong> Your academic background including degrees, institutions, and graduation years.</li>
                  <li><strong>Skills:</strong> A categorized list of your technical and soft skills.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-blue-700 mb-2">Optional Sections</h4>
                <p className="text-gray-600 mb-2">Include these sections if relevant to your background:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Projects:</strong> Personal or open-source projects that demonstrate your skills.</li>
                  <li><strong>Certifications:</strong> Professional certifications and their issuing organizations.</li>
                  <li><strong>Publications:</strong> Academic papers, articles, or blog posts you've authored.</li>
                  <li><strong>Awards:</strong> Professional recognition and achievements.</li>
                  <li><strong>Volunteer Work:</strong> Community involvement and non-profit contributions.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">Formatting Guidelines</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Use <code className="bg-gray-100 px-1"># Section Name</code> for main sections</li>
                  <li>Use <code className="bg-gray-100 px-1">## Subsection</code> for job titles or degrees</li>
                  <li>Use <code className="bg-gray-100 px-1">**bold**</code> for emphasis on dates and key info</li>
                  <li>Use <code className="bg-gray-100 px-1">- bullet points</code> for achievements and responsibilities</li>
                  <li>Keep bullet points concise and action-oriented</li>
                  <li>Quantify achievements when possible (e.g., "increased sales by 25%")</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'example' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Example Resume</h3>
                <div className="flex items-center gap-2">
                  {copyMessage && (
                    <span className="text-green-600 text-sm">{copyMessage}</span>
                  )}
                  <button
                    onClick={handleCopyExample}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Copy Example
                  </button>
                </div>
              </div>
              <pre
                data-testid="example-content"
                className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded border overflow-auto"
              >
                {exampleResume}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
