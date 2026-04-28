import { CheckCircle2 } from 'lucide-react'

interface ToastProps {
  show: boolean
  message: string
}

export function Toast({ show, message }: ToastProps) {
  if (!show) return null

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-xl bg-slate-900 px-6 py-4 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-10">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
        <CheckCircle2 size={16} />
      </div>
      <span className="font-semibold tracking-wide">{message}</span>
    </div>
  )
}
