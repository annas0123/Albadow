import { useState } from 'react'
import { isValidYouTubeUrl } from '../utils/validation'
import { fetchVideoInfo } from '../utils/api'
import UrlInput from '../components/UrlInput'
import AudioPreview from '../components/AudioPreview'
import QualitySelector from '../components/QualitySelector'
import { audioOptions } from '../utils/audioQualities'

const AudioDownloader = () => {
  const [video, setVideo] = useState(null)
  const [selectedQuality, setSelectedQuality] = useState('320')
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
      setError(err.message || 'Failed to fetch audio info. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-starlight mb-4">
            Audio Downloader
          </h1>
          <p className="text-silver">
            Extract audio from YouTube videos as MP3
          </p>
        </div>

        <UrlInput
          onFetch={handleFetch}
          loading={loading}
          error={error}
        />

        {video && (
          <div className="mt-12 space-y-8">
            <AudioPreview video={video} />

            <div className="max-w-2xl mx-auto">
              <QualitySelector
                options={audioOptions}
                selected={selectedQuality}
                onSelect={setSelectedQuality}
                label="Select Bitrate"
              />
            </div>

            <div className="max-w-2xl mx-auto p-4 bg-graphite border border-lead">
              <p className="text-silver text-sm text-center">
                Audio download is currently unavailable due to YouTube restrictions.
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

export default AudioDownloader
