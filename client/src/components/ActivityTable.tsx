import { Copy } from 'lucide-react'

interface ActivityLink {
  id: number
  original: string
  short: string
  created: string
  icon: string
}

interface ActivityTableProps {
  links: ActivityLink[]
}

export function ActivityTable({ links }: ActivityTableProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="mt-24 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-slate-50/50">
              <th className="px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-slate-400">Original Destination</th>
              <th className="px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-slate-400">Short Link</th>
              <th className="px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-slate-400">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {links.map((link) => (
              <tr key={link.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img src={link.icon} alt="" className="h-5 w-5 opacity-70" />
                    <span className="text-sm font-medium text-slate-600 truncate max-w-[240px]">{link.original}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <a href="#" className="text-sm font-medium text-indigo-500 hover:underline">{link.short}</a>
                    <button
                      onClick={() => copyToClipboard(link.short)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-500"
                      title="Copy short link"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-500">{link.created}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t bg-slate-50/30 px-6 py-4 text-center">
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            View all links
          </button>
        </div>
      </div>
    </div>
  )
}
