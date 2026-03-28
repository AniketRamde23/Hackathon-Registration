import api from '../lib/api';

export const authService = {
  login: async (data: any) => api.post('/auth/login', data),
  logout: async () => api.post('/auth/logout'),
  getMe: async () => api.get('/auth/me')
};