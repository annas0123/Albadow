const AudioPreview = ({ video }) => {
  if (!video) return null

  return (
    <div className="card-sharp max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-midnight-slate flex-shrink-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-starlight line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-silver mt-1">
            {video.duration}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AudioPreview
