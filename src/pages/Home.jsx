import ToolCard from '../components/ToolCard'

const tools = [
  {
    title: 'Video Downloader',
    description: 'Download YouTube videos in 720p, 1080p, and 4K quality',
    path: '/video',
    icon: (
      <svg className="w-8 h-8 text-mercury-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Audio Downloader',
    description: 'Extract audio from YouTube videos as MP3 in various bitrates',
    path: '/audio',
    icon: (
      <svg className="w-8 h-8 text-mercury-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    title: 'Thumbnail Downloader',
    description: 'Download YouTube thumbnails in all available resolutions',
    path: '/thumbnail',
    icon: (
      <svg className="w-8 h-8 text-mercury-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mercury-blue/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mercury-blue/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-starlight mb-6 tracking-tight">
            YouTube Tools
          </h1>
          <p className="text-xl md:text-2xl text-silver max-w-2xl mx-auto font-light">
            Download videos, audio, and thumbnails in highest quality
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <ToolCard key={tool.path} {...tool} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
