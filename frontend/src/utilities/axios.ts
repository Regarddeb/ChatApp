/// <reference types="vite/client" />

import axios from 'axios'
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`

// Request interceptor
axios.interceptors.request.use(
  config => {
    if (!(config.data instanceof FormData) && !config.headers['Content-Type']) {
      config.headers = config.headers || {}
      config.headers['Content-Type'] = 'application/json'
    }

    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('Request Error Interceptor:', error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {      

      // Handle different HTTP status codes
      const status = error.response.status
      switch (status) {
        case 401:
          // Handle unauthorized access (e.g., redirect to login page)
          break
        case 403:
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
          break
        case 500:
          // Handle internal server error
          break
        // Add more cases as needed
        default:
          // Handle other errors
          break
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error Interceptor:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axios
