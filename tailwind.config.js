/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#dc2626',
          dark: '#1f2937',
          blue: '#1e40af',
        },
        news: {
          headline: '#dc2626',
          subhead: '#374151',
          body: '#4b5563',
          border: '#e5e7eb'
        }
      },
      fontFamily: {
        // News portal fonts - similar to Times of India, Aaj Tak
        'headline': ['"Playfair Display"', 'Georgia', 'serif'],
        'subhead': ['"Roboto Slab"', 'Georgia', 'serif'],
        'body': ['"Source Sans Pro"', 'Arial', 'sans-serif'],
        'news': ['"Noto Serif"', 'Georgia', 'serif'],
      },
      fontSize: {
        'news-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'news-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'news-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'news-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'news-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      }
    },
  },
  plugins: [],
}