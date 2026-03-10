/**
 * HelpButton Component
 *
 * Story 5.1: Access Schema Template
 * Button that opens the help panel with schema and workflow information.
 */

interface HelpButtonProps {
  onClick: () => void
}

export function HelpButton({ onClick }: HelpButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded font-medium bg-gray-600 hover:bg-gray-700 text-white cursor-pointer"
      aria-label="Help & Schema Guide"
    >
      Help
    </button>
  )
}
