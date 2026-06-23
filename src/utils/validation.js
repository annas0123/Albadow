export const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)[a-zA-Z0-9_-]{11}(\S*)?$/

export const isValidYouTubeUrl = (url) => {
  return youtubeRegex.test(url)
}

export const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

export const getThumbnailUrls = (videoId) => {
  return [
    { url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, label: 'Max Res (1920x1080)' },
    { url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, label: 'High (1280x720)' },
    { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, label: 'Medium (640x480)' },
    { url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, label: 'Default (480x360)' },
  ]
}
