// src/plugins/axios.ts
import axios from 'axios'
import { useAuthStore } from "../stores/auth";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555',
  timeout: 10000,
})

//const TIMOUT = 10 * 60 * 1000;
const TIMOUT = 60 * 1000;

axiosInstance.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    const token = authStore.getJwtToken()
    config.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
const refreshToken = async () => {
  const authStore = useAuthStore();
  const currentRefreshToken = authStore.refresh;

  if (!currentRefreshToken) {
    console.error('No refresh token available for scheduled refresh.');
    authStore.logout();
    return;
  }

  try {
    console.log('Attempting scheduled token refresh...');
    const refreshResponse = await axios.post('http://localhost:5555/refresh', {
      refresh_token: currentRefreshToken,
    });

    authStore.setToken(refreshResponse.data);
    console.log('Token refreshed successfully via schedule.');
  } catch (error) {
    console.error('Unable to refresh token via schedule:', error);
    authStore.logout();
  }
};

// --- Setup Periodic Token Refresh ---
let refreshIntervalId: NodeJS.Timeout | undefined;

export const startPeriodicRefresh = () => {
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
  }
  // Immediately refresh token on startup if authenticated, then set interval
  const authStore = useAuthStore();
  if (authStore.isLoggedIn) {
    refreshToken();
  }
  refreshIntervalId = setInterval(refreshToken, TIMOUT);
  console.log(`Token refresh scheduled every ${TIMOUT / 60000} minutes.`);
};

export const stopPeriodicRefresh = () => {
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
    refreshIntervalId = undefined;
    console.log('Token refresh schedule stopped.');
  }
};

export default axiosInstance
