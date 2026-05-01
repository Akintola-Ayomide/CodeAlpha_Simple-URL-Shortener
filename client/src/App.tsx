import { useState, useEffect, useCallback } from 'react'
import { URLInput } from './components/URLInput'
import { ResultCard } from './components/ResultCard'
import { ActivityTable } from './components/ActivityTable'
import { Toast } from './components/Toast'
import { shortenUrl, getAllUrls } from './lib/api'
import type { UrlRecord, ShortenResponse } from './lib/api'

interface ToastState {
  show: boolean
  message: string
  type: 'success' | 'error'
}

export default function App() {
  const [url, setUrl] = useState('')
  const [isShortening, setIsShortening] = useState(false)
  const [result, setResult] = useState<ShortenResponse | null>(null)

  const [links, setLinks] = useState<UrlRecord[]>([])
  const [isLoadingLinks, setIsLoadingLinks] = useState(true)

  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' })

  // ─── Toast helper ────────────────────────────────────────────────────────────
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000)
  }, [])

  // ─── Fetch all links on mount ─────────────────────────────────────────────────
  const fetchLinks = useCallback(async () => {
    setIsLoadingLinks(true)
    try {
      const data = await getAllUrls()
      setLinks(data)
    } catch {
      showToast('Failed to load recent links.', 'error')
    } finally {
      setIsLoadingLinks(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  // ─── Shorten URL ──────────────────────────────────────────────────────────────
  const handleShorten = async () => {
    const trimmed = url.trim()

    if (!trimmed) {
      showToast('Please enter a URL first.', 'error')
      return
    }

    // Basic URL format check before hitting the API
    try {
      new URL(trimmed)
    } catch {
      showToast('Please enter a valid URL (e.g. https://example.com)', 'error')
      return
    }

    setIsShortening(true)
    setResult(null)

    try {
      const data = await shortenUrl(trimmed)
      setResult(data)

      // Refresh the activity table to include the new (or existing) link
      await fetchLinks()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      showToast(message, 'error')
    } finally {
      setIsShortening(false)
    }
  }

  // ─── Copy to clipboard ───────────────────────────────────────────────────────
  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast('Link copied to clipboard!', 'success')
    } catch {
      showToast('Failed to copy. Please copy manually.', 'error')
    }
  }, [showToast])

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <main className="mx-auto max-w-5xl px-6 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Shorten your links instantly
          </h1>
          <p className="text-lg text-slate-500">
            A lightweight tool for high-performance URL management.
          </p>
        </div>

        {/* Input + Result Area */}
        <div className="mx-auto max-w-3xl space-y-6">
          <URLInput
            url={url}
            setUrl={setUrl}
            onShorten={handleShorten}
            isLoading={isShortening}
          />

          {result && (
            <ResultCard
              originalUrl={result.originalUrl}
              shortUrl={result.shortUrl}
              onCopy={() => handleCopy(result.shortUrl)}
            />
          )}
        </div>

        {/* Activity Table */}
        <ActivityTable
          links={links}
          onCopy={handleCopy}
          isLoading={isLoadingLinks}
        />
      </main>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  )
}
