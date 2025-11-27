import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { newsAPI } from '../services/api'

const NewsContext = createContext()

const newsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_NEWS':
      return { ...state, news: action.payload.news, pagination: action.payload.pagination }
    case 'SET_FEATURED_NEWS':
      return { ...state, featuredNews: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

const initialState = {
  news: [],
  featuredNews: [],
  loading: false,
  error: null,
  pagination: null,
}

export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initialState)

  const fetchNews = async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await newsAPI.getAll(params)
      dispatch({
        type: 'SET_NEWS',
        payload: {
          news: response.data.news,
          pagination: response.data.pagination
        }
      })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const fetchFeaturedNews = async () => {
    try {
      const response = await newsAPI.getAll({ limit: 6 })
      dispatch({ type: 'SET_FEATURED_NEWS', payload: response.data.news })
    } catch (error) {
      console.error('Error fetching featured news:', error)
    }
  }

  useEffect(() => {
    fetchFeaturedNews()
  }, [])

  return (
    <NewsContext.Provider value={{
      ...state,
      fetchNews,
      fetchFeaturedNews,
    }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}