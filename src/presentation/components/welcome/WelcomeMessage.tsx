/**
 * WelcomeMessage Component
 *
 * A welcome overlay for first-time visitors explaining how to use the app.
 * Story 6.1: Display Welcome Message
 */

import React from 'react'

interface WelcomeMessageProps {
  isFirstVisit: boolean
  onDismiss: () => void
}

export function WelcomeMessage({ isFirstVisit, onDismiss }: WelcomeMessageProps): React.ReactElement | null {
  if (!isFirstVisit) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-label="welcome"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to AI-Friendly Resume Generator
        </h2>

        <div className="space-y-4 text-gray-600">
          <p>
            Create professional resumes with ease using Markdown syntax in our editor.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Getting Started:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Write your resume content in the left editor panel</li>
              <li>See a live preview on the right as you type</li>
              <li>Your work is automatically saved</li>
              <li>Export to PDF when you are ready</li>
            </ul>
          </div>

          <p className="text-sm">
            Use Markdown formatting for headings, lists, bold, and italic text.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={onDismiss}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
