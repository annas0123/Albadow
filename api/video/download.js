const ytdl = require('ytdl-core')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url, quality } = req.body

  if (!url) {
    return res.status(400).json({ error: 'URL is required' })
  }

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' })
  }

  try {
    const qualityMap = {
      '720': '720',
      '1080': '1080',
      '1440': '1440',
      '2160': '2160',
    }

    const targetQuality = qualityMap[quality] || '720'

    const stream = ytdl(url, {
      quality: targetQuality,
      filter: 'videoandaudio',
    })

    const info = await ytdl.getInfo(url)
    const title = info.videoDetails.title.replace(/[^\w\s-]/gi, '')

    res.setHeader('Content-Type', 'video/mp4')
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`)

    stream.pipe(res)
  } catch (error) {
    console.error('Error downloading video:', error)
    return res.status(500).json({ error: 'Download failed. Video may be private or unavailable.' })
  }
}
