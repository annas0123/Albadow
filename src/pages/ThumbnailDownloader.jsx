import { useState } from 'react'
import { isValidYouTubeUrl, extractVideoId, getThumbnailUrls } from '../utils/validation'
import UrlInput from '../components/UrlInput'
import ThumbnailPreview from '../components/ThumbnailPreview'

const ThumbnailDownloader = () => {
  const [thumbnails, setThumbnails] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFetch = async (url) => {
    setError('')
    setThumbnails([])

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL')
      return
    }

    setLoading(true)

    try {
      const videoId = extractVideoId(url)
      
      if (!videoId) {
        setError('Could not extract video ID from URL')
        return
      }

      await new Promise(resolve => setTimeout(resolve, 500))

      const thumbUrls = getThumbnailUrls(videoId).map((thumb, index) => ({
        ...thumb,
        resolution: ['1920x1080', '1280x720', '640x480', '480x360'][index],
      }))

      setThumbnails(thumbUrls)
    } catch (err) {
      setError('Failed to fetch thumbnails. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-starlight mb-4">
            Thumbnail Downloader
          </h1>
          <p className="text-silver">
            Download YouTube thumbnails in all available resolutions
          </p>
        </div>

        <UrlInput
          onFetch={handleFetch}
          loading={loading}
          error={error}
        />

        {thumbnails.length > 0 && (
          <div className="mt-12">
            <ThumbnailPreview thumbnails={thumbnails} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ThumbnailDownloader
