/**
 * App Component
 *
 * Main application component integrating editor, preview, auto-save, PDF export, welcome message, templates, and import/export.
 * Stories: 2.3, 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 3.7
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { SplitPane } from './presentation/components/layout/SplitPane'
import { MarkdownEditor } from './presentation/components/editor/MarkdownEditor'
import { MarkdownPreview } from './presentation/components/preview/MarkdownPreview'
import { ProfessionalPreview } from './presentation/components/preview/ProfessionalPreview'
import { ExportButton } from './presentation/components/export/ExportButton'
import { WelcomeMessage } from './presentation/components/welcome/WelcomeMessage'
import { HelpButton } from './presentation/components/help/HelpButton'
import { HelpPanel } from './presentation/components/help/HelpPanel'
import { TemplateSelector } from './presentation/components/templates/TemplateSelector'
import { ImportExportButtons } from './presentation/components/import-export/ImportExportButtons'
import { TemplateProvider, useTemplate } from './presentation/context/TemplateContext'
import { Logo } from './presentation/components/common/Logo'
import { LocalStorageAdapter } from './infrastructure/storage/LocalStorageAdapter'
import { PdfExporter } from './infrastructure/exporters/PdfExporter'
import type { TemplateId } from './templates'
import './App.css'

const storage = new LocalStorageAdapter()
const pdfExporter = new PdfExporter()
const HAS_VISITED_KEY = 'resume:hasVisited'

function AppContent() {
  const [content, setContent] = useState<string>('')
  const [isExporting, setIsExporting] = useState<boolean>(false)
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false)
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false)
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState<boolean>(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const { selectedTemplate, setSelectedTemplate, template } = useTemplate()

  // Check if first visit and load saved content on mount
  useEffect(() => {
    const hasVisited = localStorage.getItem(HAS_VISITED_KEY)
    if (!hasVisited) {
      setIsFirstVisit(true)
    }

    const savedContent = storage.loadContent()
    if (savedContent) {
      setContent(savedContent)
    }
  }, [])

  // Auto-save content when it changes
  useEffect(() => {
    if (content) {
      const timeoutId = setTimeout(() => {
        storage.saveContent(content)
      }, 2000)
      return () => clearTimeout(timeoutId)
    }
  }, [content])

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent)
  }, [])

  const handleExport = useCallback(async (filename: string) => {
    if (!previewRef.current) return

    setIsExporting(true)
    try {
      await pdfExporter.exportToPdf(previewRef.current, {
        filename,
      })
    } finally {
      setIsExporting(false)
    }
  }, [])

  const handleDismissWelcome = useCallback(() => {
    localStorage.setItem(HAS_VISITED_KEY, 'true')
    setIsFirstVisit(false)
  }, [])

  const handleOpenHelp = useCallback(() => {
    setIsHelpOpen(true)
  }, [])

  const handleCloseHelp = useCallback(() => {
    setIsHelpOpen(false)
  }, [])

  const handleToggleTemplateSelector = useCallback(() => {
    setIsTemplateSelectorOpen((prev) => !prev)
  }, [])

  const handleSelectTemplate = useCallback((templateId: string) => {
    setSelectedTemplate(templateId as TemplateId)
    setIsTemplateSelectorOpen(false)
  }, [setSelectedTemplate])

  const handleImport = useCallback((importedContent: string) => {
    setContent(importedContent)
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col">
      <WelcomeMessage isFirstVisit={isFirstVisit} onDismiss={handleDismissWelcome} />
      <header className="bg-gray-800 text-white p-3 flex justify-between items-center">
        <Logo />
        <div className="flex gap-2">
          <ImportExportButtons
            content={content}
            onImport={handleImport}
            hasUnsavedChanges={content.length > 0}
          />
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
            isOpen={isTemplateSelectorOpen}
            onToggle={handleToggleTemplateSelector}
          />
          <HelpButton onClick={handleOpenHelp} />
          <ExportButton onExport={handleExport} isExporting={isExporting} />
        </div>
      </header>
      <HelpPanel isOpen={isHelpOpen} onClose={handleCloseHelp} />
      <main className="flex-1 overflow-hidden">
        <SplitPane
          leftPane={
            <MarkdownEditor
              content={content}
              onChange={handleContentChange}
            />
          }
          rightPane={
            <div ref={previewRef} className="h-full">
              {selectedTemplate === 'professional' ? (
                <ProfessionalPreview content={content} />
              ) : (
                <MarkdownPreview content={content} templateClassName={template.className} />
              )}
            </div>
          }
        />
      </main>
    </div>
  )
}

function App() {
  return (
    <TemplateProvider>
      <AppContent />
    </TemplateProvider>
  )
}

export default App
