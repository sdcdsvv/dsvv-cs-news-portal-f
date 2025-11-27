import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NewsProvider } from './context/NewsContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import NewsListing from './pages/NewsListing'
import NewsDetail from './pages/NewsDetail'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import PrivateRoute from './components/PrivateRoute'
import Clubs from './pages/Clubs'

function App() {
  const navigate = useNavigate()

  return (
    <NewsProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsListing />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/category/:category" element={<NewsListing />} />
            <Route path="/club/:clubName" element={<NewsListing />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </NewsProvider>
  )
}

// 404 Component
const NotFound = () => {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="news-headline text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Go Back Home
        </button>
      </div>
    </div>
  )
}

export default App