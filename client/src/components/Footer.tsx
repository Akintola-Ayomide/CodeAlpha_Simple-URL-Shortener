export function Footer() {
  return (
    <footer className="mt-24 border-t bg-white px-6 py-10 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm">© 2024 LinkSlim Inc.</p>
        <div className="flex gap-8 text-sm font-semibold">
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-600 transition-colors">API</a>
        </div>
      </div>
    </footer>
  )
}
