const VideoPreview = ({ video }) => {
  if (!video) return null

  return (
    <div className="card-sharp max-w-2xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="aspect-video bg-midnight-slate overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
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

export default VideoPreview
