import api from '../lib/api';

export const scoreService = {
  submit: async (data: any) => api.post('/scores', data),
  get: async (teamId: string) => api.get('/scores/' + teamId),
  getLeaderboard: async () => api.get('/scores/leaderboard')
};