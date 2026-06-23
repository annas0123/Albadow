const ytdl = require('ytdl-core')
const { Readable } = require('stream')

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
    const stream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    })

    const info = await ytdl.getInfo(url)
    const title = info.videoDetails.title.replace(/[^\w\s-]/gi, '')

    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`)

    stream.pipe(res)
  } catch (error) {
    console.error('Error downloading audio:', error)
    return res.status(500).json({ error: 'Download failed. Video may be private or unavailable.' })
  }
}
