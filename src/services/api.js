import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const ticketService = {
  getAllTickets: () => api.get('/api/tickets'),
  getTicketById: (id) => api.get(`/api/tickets/${id}`),
  createTicket: (ticketData) => api.post('/api/tickets', ticketData),
  updateTicket: (id, ticketData) => api.put(`/api/tickets/${id}`, ticketData),
  deleteTicket: (id) => api.delete(`/api/tickets/${id}`),
  searchTickets: (query) => api.get(`/api/tickets/search?q=${query}`),
};

export const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  verifyToken: () => api.get('/api/auth/verify'),
  logout: () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },
};

export const userService = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (userData) => api.put('/api/users/profile', userData),
};

export const healthService = {
  checkBackend: () => api.get('/health'),
  checkDatabase: () => api.get('/api/health/db'),
};

export default api;
