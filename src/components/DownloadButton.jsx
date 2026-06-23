import Button from './Button'
import Spinner from './Spinner'

const DownloadButton = ({ onClick, loading, disabled, children = 'Download' }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Spinner size="sm" className="text-pure-white" />
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{children}</span>
        </>
      )}
    </Button>
  )
}

export default DownloadButton
