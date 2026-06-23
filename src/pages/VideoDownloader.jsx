import { useState } from 'react'
import { isValidYouTubeUrl } from '../utils/validation'
import { fetchVideoInfo } from '../utils/api'
import UrlInput from '../components/UrlInput'
import VideoPreview from '../components/VideoPreview'
import QualitySelector from '../components/QualitySelector'
import Button from '../components/Button'
import { qualityOptions } from '../utils/qualities'

const VideoDownloader = () => {
  const [video, setVideo] = useState(null)
  const [selectedQuality, setSelectedQuality] = useState('1080')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFetch = async (url) => {
    setError('')
    setVideo(null)

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL')
      return
    }

    setLoading(true)

    try {
      const info = await fetchVideoInfo(url)
      setVideo({ ...info, url })
    } catch (err) {
      setError(err.message || 'Failed to fetch video info. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-starlight mb-4">
            Video Downloader
          </h1>
          <p className="text-silver">
            Download YouTube videos in high quality
          </p>
        </div>

        <UrlInput
          onFetch={handleFetch}
          loading={loading}
          error={error}
        />

        {video && (
          <div className="mt-12 space-y-8">
            <VideoPreview video={video} />

            <div className="max-w-2xl mx-auto">
              <QualitySelector
                options={qualityOptions}
                selected={selectedQuality}
                onSelect={setSelectedQuality}
                label="Select Quality"
              />
            </div>

            <div className="max-w-2xl mx-auto p-4 bg-graphite border border-lead">
              <p className="text-silver text-sm text-center">
                Video download is currently unavailable due to YouTube restrictions.
                <br />
                <span className="text-mercury-blue">Try the Thumbnail Downloader instead!</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoDownloader
