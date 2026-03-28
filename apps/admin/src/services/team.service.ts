import api from '../lib/api';

export const teamService = {
  create: async (data: any) => api.post('/teams', data),
  join: async (code: string) => api.post('/teams/join', { code }),
  get: async (id: string) => api.get('/teams/' + id),
  update: async (id: string, data: any) => api.put('/teams/' + id, data)
};