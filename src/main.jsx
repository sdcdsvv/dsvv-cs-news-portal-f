import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Create router with all routes
const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    // You can add errorElement here for better error handling
    errorElement: <ErrorBoundary />
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
})

// Error Boundary Component
function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8">
        <h1 className="news-headline text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-primary-red text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)