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

  const COBALT_INSTANCES = [
    'https://rue-cobalt.xenon.zone',
    'https://api.cobalt.blackcat.sweeux.org'
  ]

  let lastError = null
  for (const instance of COBALT_INSTANCES) {
    try {
      const response = await fetch(instance, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          videoQuality: quality || '720',
          downloadMode: 'auto'
        })
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`Status ${response.status}: ${text}`)
      }

      const data = await response.json()
      if (data.status === 'error') {
        throw new Error(data.error?.code || data.text || 'API Error')
      }

      if (data.status === 'tunnel' || data.status === 'redirect') {
        return res.status(200).json({
          success: true,
          url: data.url,
          filename: data.filename
        })
      }

      throw new Error(`Unexpected status: ${data.status}`)
    } catch (err) {
      console.warn(`Failed fetching from ${instance}:`, err.message)
      lastError = err
    }
  }

  return res.status(500).json({
    error: lastError ? `Download failed: ${lastError.message}` : 'Failed to process download via Cobalt API.'
  })
}
