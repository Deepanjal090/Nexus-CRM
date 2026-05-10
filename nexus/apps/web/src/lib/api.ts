import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1', // Proxied via Vite
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept responses for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
