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

    const thumbnails = [
      { url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, label: 'Max Res', resolution: '1920x1080' },
      { url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, label: 'High', resolution: '1280x720' },
      { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, label: 'Medium', resolution: '640x480' },
      { url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, label: 'Default', resolution: '480x360' },
    ]

    return res.status(200).json({ thumbnails })
  } catch (error) {
    console.error('Error fetching thumbnails:', error.message)
    return res.status(500).json({ error: 'Failed to fetch thumbnails' })
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
