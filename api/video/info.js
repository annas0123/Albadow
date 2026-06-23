import ytdl from 'ytdl-core'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url } = req.body

  if (!url) {
    return res.status(400).json({ error: 'URL is required' })
  }

  try {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' })
    }

    const info = await ytdl.getInfo(url)
    const videoDetails = info.videoDetails

    return res.status(200).json({
      title: videoDetails.title,
      thumbnail: videoDetails.thumbnails?.pop()?.url || `https://img.youtube.com/vi/${videoDetails.videoId}/maxresdefault.jpg`,
      duration: formatDuration(parseInt(videoDetails.lengthSeconds)),
      videoId: videoDetails.videoId,
      formats: [
        { quality: '720', label: '720p' },
        { quality: '1080', label: '1080p' },
        { quality: '1440', label: '1440p' },
        { quality: '2160', label: '4K' },
      ],
    })
  } catch (error) {
    console.error('Error fetching video info:', error.message)
    const message = error.message?.includes('private')
      ? 'Video is private or unavailable'
      : error.message?.includes('region')
      ? 'Video not available in your region'
      : 'Failed to fetch video info. Please check the URL and try again.'
    return res.status(500).json({ error: message })
  }
}

function formatDuration(seconds) {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
