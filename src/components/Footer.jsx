const Footer = () => {
  return (
    <footer className="bg-midnight-slate border-t border-lead mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-mercury-blue rounded-pill flex items-center justify-center">
              <svg className="w-5 h-5 text-pure-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span className="text-lg font-medium text-starlight">YouTube Tools</span>
          </div>

          <p className="text-silver text-sm">
            &copy; {new Date().getFullYear()} YouTube Tools. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-lead text-xs">Powered by cobalt.tools</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
