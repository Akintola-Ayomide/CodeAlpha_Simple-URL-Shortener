import { Copy } from 'lucide-react'

interface ResultCardProps {
  shortUrl: string
  onCopy: () => void
}

export function ResultCard({ shortUrl, onCopy }: ResultCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 overflow-hidden rounded-lg bg-slate-100 p-2 flex items-center justify-center">
          <img src="https://github.com/fluidicon.png" alt="" className="h-6 w-6" />
        </div>
        <span className="font-medium text-indigo-600">{shortUrl}</span>
      </div>
      <button 
        onClick={onCopy}
        className="flex items-center gap-2 rounded-xl bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
      >
        <Copy size={16} />
        Copy
      </button>
    </div>
  )
}
