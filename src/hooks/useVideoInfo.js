import { useState, useCallback } from 'react'
import { fetchVideoInfo } from '../utils/api'

const useVideoInfo = () => {
  const [videoInfo, setVideoInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getVideoInfo = useCallback(async (url) => {
    setLoading(true)
    setError(null)
    setVideoInfo(null)

    try {
      const info = await fetchVideoInfo(url)
      setVideoInfo(info)
      return info
    } catch (err) {
      setError(err.message || 'Failed to fetch video info')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setVideoInfo(null)
    setLoading(false)
    setError(null)
  }, [])

  return {
    videoInfo,
    loading,
    error,
    getVideoInfo,
    reset,
  }
}

export default useVideoInfo
