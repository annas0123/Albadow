const ytdl = require('ytdl-core')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url } = req.body

  if (!url) {
    return res.status(400).json({ error: 'URL is required' })
  }

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' })
  }

  try {
    const info = await ytdl.getInfo(url)
    const formats = info.formats
      .filter(f => f.hasVideo && f.hasAudio)
      .map(f => ({
        quality: f.qualityLabel,
        url: f.url,
        size: f.contentLength ? `${(parseInt(f.contentLength) / (1024 * 1024)).toFixed(1)} MB` : 'Unknown',
      }))

    const videoDetails = info.videoDetails

    return res.status(200).json({
      title: videoDetails.title,
      thumbnail: videoDetails.thumbnails.pop()?.url || `https://img.youtube.com/vi/${videoDetails.videoId}/maxresdefault.jpg`,
      duration: formatDuration(parseInt(videoDetails.lengthSeconds)),
      formats: [
        { quality: '720', label: '720p' },
        { quality: '1080', label: '1080p' },
        { quality: '1440', label: '1440p' },
        { quality: '2160', label: '4K' },
      ],
    })
  } catch (error) {
    console.error('Error fetching video info:', error)
    return res.status(500).json({ error: 'Failed to fetch video info. Video may be private or unavailable.' })
  }
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
