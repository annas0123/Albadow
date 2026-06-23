import { useState } from 'react'
import { isValidYouTubeUrl } from '../utils/validation'
import { fetchVideoInfo, downloadAudio } from '../utils/api'
import UrlInput from '../components/UrlInput'
import AudioPreview from '../components/AudioPreview'
import QualitySelector from '../components/QualitySelector'
import DownloadButton from '../components/DownloadButton'
import { audioOptions } from '../utils/audioQualities'

const AudioDownloader = () => {
  const [video, setVideo] = useState(null)
  const [selectedQuality, setSelectedQuality] = useState('320')
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
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

  const handleDownload = async () => {
    if (!video) return

    setDownloading(true)
    setError('')

    try {
      const result = await downloadAudio(video.url, selectedQuality)
      
      const a = document.createElement('a')
      a.href = result.url
      a.download = result.filename || `${video.title || 'audio'}.mp3`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (err) {
      setError(err.message || 'Download failed. Please try again.')
    } finally {
      setDownloading(false)
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

            <div className="max-w-2xl mx-auto">
              <DownloadButton
                onClick={handleDownload}
                loading={downloading}
              >
                Download Audio
              </DownloadButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioDownloader
