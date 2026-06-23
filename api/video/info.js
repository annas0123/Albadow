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
    const videoId = extractVideoId(url)

    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' })
    }

    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    const response = await fetch(oembedUrl)

    if (!response.ok) {
      return res.status(404).json({ error: 'Video not found or is private' })
    }

    const data = await response.json()

    return res.status(200).json({
      title: data.title || 'YouTube Video',
      author: data.author_name || 'Unknown',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoId: videoId,
      formats: [
        { quality: '360', label: '360p' },
        { quality: '480', label: '480p' },
        { quality: '720', label: '720p' },
        { quality: '1080', label: '1080p' },
      ],
    })
  } catch (error) {
    console.error('Error fetching video info:', error.message)
    return res.status(500).json({ error: 'Failed to fetch video info. Please try again.' })
  }
}

function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}
