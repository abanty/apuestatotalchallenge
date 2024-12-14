import { useRouter } from 'next/router'

import axios from 'axios'

export const API_URL = process.env.NEXT_PUBLIC_SERVER_API || ''
export const BUCKET_ORIGIN_SPACE = process.env.NEXT_PUBLIC_BUCKET_ORIGIN_SPACE || ''

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar token automáticamente si existe
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') // Obtener token del sessionStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Agregar el token al header si existe
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de respuesta
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      const router = useRouter()

      router.push('/login')
    }

    return Promise.reject(error)
  }
)

// if token expidered
export default instance
