import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import VideoDownloader from './pages/VideoDownloader'
import AudioDownloader from './pages/AudioDownloader'
import ThumbnailDownloader from './pages/ThumbnailDownloader'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-deep-space">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video" element={<VideoDownloader />} />
            <Route path="/audio" element={<AudioDownloader />} />
            <Route path="/thumbnail" element={<ThumbnailDownloader />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
