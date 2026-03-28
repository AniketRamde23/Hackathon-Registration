import api from '../lib/api';

export const ticketService = {
  get: async (id: string) => api.get('/tickets/' + id),
  download: async (id: string) => api.get('/tickets/' + id + '/download', { responseType: 'blob' })
};