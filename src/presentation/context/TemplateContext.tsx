/**
 * Template Context
 *
 * Provides template state management with localStorage persistence.
 * Story 3.6: Template Context and State Management
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { templates, getTemplateById, getDefaultTemplate, type TemplateId, type BaseTemplate } from '../../templates'

const STORAGE_KEY = 'resume:template'

interface TemplateContextValue {
  selectedTemplate: TemplateId
  setSelectedTemplate: (id: TemplateId) => void
  template: BaseTemplate
  templates: BaseTemplate[]
}

const TemplateContext = createContext<TemplateContextValue | null>(null)

function isValidTemplateId(id: string): id is TemplateId {
  return ['classic', 'modern', 'minimal'].includes(id)
}

function loadSavedTemplate(): TemplateId {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && isValidTemplateId(saved)) {
      return saved
    }
  } catch {
    // localStorage may not be available
  }
  return 'classic'
}

interface TemplateProviderProps {
  children: React.ReactNode
}

export function TemplateProvider({ children }: TemplateProviderProps): React.ReactElement {
  const [selectedTemplate, setSelectedTemplateState] = useState<TemplateId>(loadSavedTemplate)

  const setSelectedTemplate = useCallback((id: TemplateId) => {
    setSelectedTemplateState(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // localStorage may not be available
    }
  }, [])

  const template = useMemo(() => {
    return getTemplateById(selectedTemplate) || getDefaultTemplate()
  }, [selectedTemplate])

  const value = useMemo(
    () => ({
      selectedTemplate,
      setSelectedTemplate,
      template,
      templates,
    }),
    [selectedTemplate, setSelectedTemplate, template]
  )

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useTemplate(): TemplateContextValue {
  const context = useContext(TemplateContext)
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider')
  }
  return context
}
