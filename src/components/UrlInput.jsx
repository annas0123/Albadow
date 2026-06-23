import { useState } from 'react'
import Button from './Button'

const PasteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
)

const UrlInput = ({ onFetch, loading, error, placeholder = 'Paste YouTube URL here...' }) => {
  const [url, setUrl] = useState('')

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (url.trim()) {
      onFetch(url.trim())
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="input-pill pr-12 w-full"
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lead hover:text-starlight transition-colors"
            title="Paste from clipboard"
          >
            <PasteIcon />
          </button>
        </div>
        <Button type="submit" disabled={loading || !url.trim()}>
          {loading ? 'Fetching...' : 'Fetch'}
        </Button>
      </form>

      {error && (
        <p className="mt-3 text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  )
}

export default UrlInput
