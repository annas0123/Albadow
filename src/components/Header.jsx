import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/video', label: 'Video Downloader' },
    { path: '/audio', label: 'Audio Downloader' },
    { path: '/thumbnail', label: 'Thumbnail Downloader' },
  ]

  return (
    <header className="bg-midnight-slate border-b border-lead sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-mercury-blue rounded-pill flex items-center justify-center">
            <svg className="w-6 h-6 text-pure-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <span className="text-xl font-semibold text-starlight">YouTube Tools</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-mercury-blue'
                  : 'text-silver hover:text-starlight'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden text-starlight">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
