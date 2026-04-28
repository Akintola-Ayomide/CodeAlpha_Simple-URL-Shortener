import { Link2 } from 'lucide-react'

interface URLInputProps {
  url: string
  setUrl: (url: string) => void
  onShorten: () => void
}

export function URLInput({ url, setUrl, onShorten }: URLInputProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 pl-6 shadow-sm focus-within:ring-2 focus-within:ring-indigo-600/20 focus-within:border-indigo-600 transition-all">
      <Link2 className="text-slate-400" size={20} />
      <input 
        type="text" 
        placeholder="Paste your long URL here..." 
        className="flex-1 bg-transparent py-3 text-lg outline-none placeholder:text-slate-400"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button 
        onClick={onShorten}
        className="rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-indigo-700 transition-all active:scale-[0.98]"
      >
        Shorten URL
      </button>
    </div>
  )
}
