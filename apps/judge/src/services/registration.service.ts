import api from '../lib/api';

export const registrationService = {
  create: async (data: any) => api.post('/registrations', data),
  get: async (id: string) => api.get('/registrations/' + id),
  cancel: async (id: string) => api.post('/registrations/' + id + '/cancel')
};