/**
 * ThemeToggle Component
 *
 * A button to toggle between light and dark themes.
 * Story 7.2: Theme Toggle Button
 */

import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle(): React.ReactElement {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="px-3 py-2 rounded font-medium bg-gray-600 hover:bg-gray-700 text-white text-sm"
    >
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}
