import axios from 'axios';

const STORAGE_KEY = 'nexus_auth';

const api = axios.create({
  baseURL: '/api/v1', // Proxied via Vite
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from persisted auth state on every request
api.interceptors.request.use((config) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { accessToken } = JSON.parse(saved);
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
  } catch {
    // ignore parse errors
  }
  return config;
});

// Only force-redirect to /login on 401 if we had a token (session expired).
// If there's no token at all, let the AuthGuard handle it gracefully.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { accessToken } = JSON.parse(saved);
          if (accessToken) {
            // Token was present but rejected — clear it and redirect
            localStorage.removeItem(STORAGE_KEY);
            window.location.href = '/login';
          }
        }
      } catch {
        // ignore
      }
    }
    return Promise.reject(error);
  }
);

export default api;
