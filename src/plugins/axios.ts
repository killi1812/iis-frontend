// src/plugins/axios.ts
import axios from 'axios'
import { useAuthStore } from "../stores/auth";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555',
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    const token = authStore.getJwtToken()
    config.headers["Access-Control-Allow-Origin"] ="http://localhost:3000"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
