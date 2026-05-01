import { Copy, Loader2, LinkIcon } from 'lucide-react'
import type { UrlRecord } from '../lib/api'

interface ActivityTableProps {
  links: UrlRecord[]
  onCopy: (text: string) => void
  isLoading?: boolean
}

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str
  return str.slice(0, max) + '...'
}

export function ActivityTable({ links, onCopy, isLoading = false }: ActivityTableProps) {
  return (
    <div className="mt-24 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
        {isLoading && (
          <Loader2 size={18} className="animate-spin text-slate-400" />
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-slate-50/50">
              <th className="px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-slate-400">
                Original Destination
              </th>
              <th className="px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-slate-400">
                Short Link
              </th>
              <th className="px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-slate-400">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && links.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                  <Loader2 className="mx-auto mb-2 animate-spin" size={24} />
                  <span className="text-sm">Loading recent links...</span>
                </td>
              </tr>
            ) : links.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                  <LinkIcon className="mx-auto mb-2 opacity-30" size={32} />
                  <span className="text-sm">No shortened links yet. Start by pasting a URL above!</span>
                </td>
              </tr>
            ) : (
              links.map((link) => {
                const domain = getDomain(link.originalUrl)
                return (
                  <tr key={link.id} className="group hover:bg-slate-50/50 transition-colors">
                    {/* Original URL */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                          alt=""
                          className="h-5 w-5 opacity-70 shrink-0"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                        <span
                          className="text-sm font-medium text-slate-600 truncate max-w-[240px]"
                          title={link.originalUrl}
                        >
                          {truncate(link.originalUrl, 50)}
                        </span>
                      </div>
                    </td>

                    {/* Short link */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <a
                          href={link.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-indigo-500 hover:underline cursor-pointer"
                          title={link.shortUrl}
                        >
                          {link.shortUrl}
                        </a>
                        <button
                          onClick={() => onCopy(link.shortUrl)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-500 cursor-pointer"
                          title="Copy short link"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-slate-500">{formatDate(link.createdAt)}</span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
