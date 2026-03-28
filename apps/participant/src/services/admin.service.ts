import api from '../lib/api';

export const adminService = {
  getRegistrations: async () => api.get('/admin/registrations'),
  scanQR: async (data: any) => api.post('/admin/scan', data),
  getAnalytics: async () => api.get('/admin/analytics')
};