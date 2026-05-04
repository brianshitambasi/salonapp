import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://salon-1-1.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Service APIs
export const serviceAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// Staff APIs
export const staffAPI = {
  getAll: () => api.get('/staff'),
  getById: (id) => api.get(`/staff/${id}`),
  create: (data) => api.post('/staff', data),
  update: (id, data) => api.put(`/staff/${id}`, data),
  delete: (id) => api.delete(`/staff/${id}`),
};

// Booking APIs
export const bookingAPI = {
  getAvailableSlots: (data) => api.post('/bookings/available-slots', data),
  create: (data) => api.post('/bookings', data),
  getMyBookings: (data) => api.post('/bookings/my', data),
  cancel: (data) => api.post('/bookings/cancel', data),
  adminGetAll: (params) => api.get('/bookings/admin/all', { params }),
  adminUpdateStatus: (id, status) => api.put(`/bookings/admin/${id}/status`, { status }),
  markAsRead: (id) => api.put(`/bookings/admin/${id}/read`),
  getUnreadCount: () => api.get('/bookings/admin/unread/count'),
};

// Gallery APIs
export const galleryAPI = {
  getAll: () => api.get('/gallery'),
  getById: (id) => api.get(`/gallery/${id}`),
  create: (data) => api.post('/gallery', data),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
  like: (id) => api.post(`/gallery/${id}/like`),
  addComment: (id, comment) => api.post(`/gallery/${id}/comments`, comment),
  deleteComment: (postId, commentId) => api.delete(`/gallery/${postId}/comments/${commentId}`),
  addRating: (id, rating) => api.post(`/gallery/${id}/ratings`, rating),
};

// Review APIs
export const reviewAPI = {
  getAll: () => api.get('/reviews'),
  getStats: () => api.get('/reviews/stats/average'),
  create: (data) => api.post('/reviews', data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// Salon Info APIs
export const salonInfoAPI = {
  get: () => api.get('/salon-info'),
  update: (data) => api.put('/salon-info', data),
  getHours: () => api.get('/salon-info/hours'),
};

export default api;
