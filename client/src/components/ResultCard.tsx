import { Copy, CheckCheck, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface ResultCardProps {
  originalUrl: string
  shortUrl: string
  onCopy: () => void
}

export function ResultCard({ originalUrl, shortUrl, onCopy }: ResultCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Extract domain for favicon
  const domain = (() => {
    try {
      return new URL(originalUrl).hostname
    } catch {
      return ''
    }
  })()

  return (
    <div className="flex items-center justify-between rounded-2xl border border-indigo-100 bg-white p-6 shadow-[0_4px_20px_rgba(99,102,241,0.08)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 min-w-0">
        {/* Favicon */}
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100 p-2 flex items-center justify-center">
          {domain ? (
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
              alt=""
              className="h-6 w-6"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          ) : null}
        </div>

        {/* URL info */}
        <div className="min-w-0">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
          >
            {shortUrl}
            <ExternalLink size={14} className="shrink-0 opacity-60" />
          </a>
          <p className="mt-0.5 text-sm text-slate-400 truncate max-w-xs">{originalUrl}</p>
        </div>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all active:scale-95 cursor-pointer ml-4 ${
          copied
            ? 'bg-emerald-50 text-emerald-600'
            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
        }`}
      >
        {copied ? (
          <>
            <CheckCheck size={16} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy
          </>
        )}
      </button>
    </div>
  )
}
