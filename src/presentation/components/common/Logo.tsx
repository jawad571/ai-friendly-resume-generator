/**
 * Logo Component
 *
 * Displays the AI-Friendly Resume Generator logo with icon and text.
 */

const faviconUrl = `${import.meta.env.BASE_URL}favicon.svg`

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img src={faviconUrl} alt="" className="h-10 w-10" />
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI-</span>
          <span className="text-white">Friendly</span>
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-300 uppercase">
          Resume Generator
        </span>
      </div>
    </div>
  )
}
