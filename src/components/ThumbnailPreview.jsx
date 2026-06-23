import Button from './Button'

const ThumbnailPreview = ({ thumbnails }) => {
  if (!thumbnails || thumbnails.length === 0) return null

  const handleDownload = async (url, label) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `thumbnail-${label}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      a.remove()
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {thumbnails.map((thumb, index) => (
        <div key={index} className="card-sharp">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-48 aspect-video bg-midnight-slate flex-shrink-0 overflow-hidden">
              <img
                src={thumb.url}
                alt={thumb.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-starlight font-medium">{thumb.label}</h4>
              <p className="text-sm text-silver mt-1">{thumb.resolution}</p>
            </div>
            <Button
              onClick={() => handleDownload(thumb.url, thumb.label)}
              variant="secondary"
              className="whitespace-nowrap"
            >
              Download
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ThumbnailPreview
