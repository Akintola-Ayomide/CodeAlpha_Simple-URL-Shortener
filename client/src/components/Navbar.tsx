import { User } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
              L
            </div>
            <span className="text-xl font-bold tracking-tight text-indigo-900">LinkSlim</span>
          </div>
          
          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 pb-5 translate-y-[21px]">
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              Analytics
            </a>
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              Settings
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all md:block">
            Create New
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  )
}
