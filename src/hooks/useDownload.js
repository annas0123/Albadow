import { useState } from 'react'

const useDownload = () => {
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const download = async (url, filename) => {
    setDownloading(true)
    setProgress(0)
    setError(null)

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Download failed')
      }

      const contentLength = response.headers.get('content-length')
      const total = parseInt(contentLength, 10)
      const reader = response.body.getReader()

      let receivedLength = 0
      const chunks = []

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        chunks.push(value)
        receivedLength += value.length

        if (total) {
          setProgress(Math.round((receivedLength / total) * 100))
        }
      }

      const blob = new Blob(chunks)
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      a.remove()

      setProgress(100)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setDownloading(false)
    }
  }

  return { download, downloading, progress, error }
}

export default useDownload
