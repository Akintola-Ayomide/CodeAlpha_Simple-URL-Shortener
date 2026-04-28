import { useState } from 'react'
import { URLInput } from './components/URLInput'
import { ResultCard } from './components/ResultCard'
import { ActivityTable } from './components/ActivityTable'
import { Toast } from './components/Toast'

export default function App() {
  const [url, setUrl] = useState('')
  const [showResult, setShowResult] = useState(true)
  const [showToast, setShowToast] = useState(false)

  const handleShorten = () => {
    // UI logic only for now
    setShowResult(true)
  }

  const copyToClipboard = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const recentLinks = [
    {
      id: 1,
      original: 'linear.app/linkslim/project/updates...',
      short: 'lslim.co/v2-roadmap',
      clicks: '1,242',
      created: 'Oct 24, 2023',
      icon: 'https://www.google.com/s2/favicons?domain=linear.app&sz=32'
    },
    {
      id: 2,
      original: 'notion.so/workspace/brand-guidel...',
      short: 'lslim.co/brand-kit',
      clicks: '843',
      created: 'Oct 22, 2023',
      icon: 'https://www.google.com/s2/favicons?domain=notion.so&sz=32'
    },
    {
      id: 3,
      original: 'dribbble.com/shots/2143567-UI-Ki...',
      short: 'lslim.co/ui-shot',
      clicks: '42',
      created: 'Oct 20, 2023',
      icon: 'https://www.google.com/s2/favicons?domain=dribbble.com&sz=32'
    }
  ]

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

        {/* Input Area */}
        <div className="mx-auto max-w-3xl space-y-6">
          <URLInput 
            url={url} 
            setUrl={setUrl} 
            onShorten={handleShorten} 
          />

          {showResult && (
            <ResultCard 
              shortUrl="lslim.co/gh-repo-72" 
              onCopy={copyToClipboard} 
            />
          )}
        </div>

        <ActivityTable links={recentLinks} />
      </main>

      <Toast show={showToast} message="Link copied!" />
    </div>
  )
}
