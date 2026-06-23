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

  const { url, quality } = req.body

  if (!url) {
    return res.status(400).json({ error: 'URL is required' })
  }

  try {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' })
    }

    const info = await ytdl.getInfo(url)
    const title = info.videoDetails.title.replace(/[^\w\s-]/gi, '') || 'video'

    let formatOptions = {
      quality: quality || '1080',
      filter: 'videoandaudio',
    }

    const stream = ytdl(url, formatOptions)

    res.setHeader('Content-Type', 'video/mp4')
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`)

    stream.pipe(res)

    stream.on('error', (err) => {
      console.error('Stream error:', err.message)
      if (!res.headersSent) {
        res.status(500).json({ error: 'Download failed' })
      }
    })
  } catch (error) {
    console.error('Error downloading video:', error.message)
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Download failed. Please try again.' })
    }
  }
}
