import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interceptores para manejar tokens y errores
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

// Servicios para Tickets (adaptados a tu backend)
export const ticketService = {
  // Obtener todos los tickets
  getAllTickets: () => api.get('/api/tickets'),
  
  // Obtener ticket por ID
  getTicketById: (id) => api.get(`/api/tickets/${id}`),
  
  // Crear nuevo ticket
  createTicket: (ticketData) => api.post('/api/tickets', ticketData),
  
  // Actualizar ticket
  updateTicket: (id, ticketData) => api.put(`/api/tickets/${id}`, ticketData),
  
  // Eliminar ticket
  deleteTicket: (id) => api.delete(`/api/tickets/${id}`),
  
  // Buscar tickets
  searchTickets: (query) => api.get(`/api/tickets/search?q=${query}`),
};

// Servicios de Autenticación
export const authService = {
  // Login
  login: (credentials) => api.post('/api/auth/login', credentials),
  
  // Registro
  register: (userData) => api.post('/api/auth/register', userData),
  
  // Verificar token
  verifyToken: () => api.get('/api/auth/verify'),
  
  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },
};

// Servicios de Usuarios
export const userService = {
  // Obtener perfil de usuario
  getProfile: () => api.get('/api/users/profile'),
  
  // Actualizar perfil
  updateProfile: (userData) => api.put('/api/users/profile', userData),
};

// Health check
export const healthService = {
  checkBackend: () => api.get('/health'),
  checkDatabase: () => api.get('/api/health/db'),
};

export default api;
