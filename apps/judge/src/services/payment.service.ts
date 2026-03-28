import api from '../lib/api';

export const paymentService = {
  createOrder: async (data: any) => api.post('/payments/order', data),
  verifyPayment: async (data: any) => api.post('/payments/verify', data)
};