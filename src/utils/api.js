const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000

export const fetchVideoInfo = async (url) => {
  const cacheKey = `video-info-${url}`
  
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)
    if (Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }
    cache.delete(cacheKey)
  }

  const response = await fetch('/api/video/info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch video info')
  }

  const data = await response.json()
  
  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  })

  return data
}

export const downloadVideo = async (url, quality) => {
  const response = await fetch('/api/video/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, quality }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Download failed')
  }

  return response.json()
}

export const downloadAudio = async (url, quality) => {
  const response = await fetch('/api/video/audio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, quality }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Download failed')
  }

  return response.json()
}

export const fetchThumbnails = async (url) => {
  const cacheKey = `thumbnails-${url}`
  
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)
    if (Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }
    cache.delete(cacheKey)
  }

  const response = await fetch('/api/video/thumbnail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch thumbnails')
  }

  const data = await response.json()
  
  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  })

  return data
}

export const clearCache = () => {
  cache.clear()
}
