const fs = require('fs');
const path = require('path');

const apps = ['participant', 'admin', 'judge'];

const apiContent = `import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(/(^| )jwt=([^;]+)/);
  if (match) return match[2];
  return localStorage.getItem('jwt');
};

const redirectToLogin = () => {
  if (typeof window !== 'undefined') window.location.href = '/login';
};

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) redirectToLogin();
    return Promise.reject(err);
  }
);

export default api;
`;

const stubs = {
  auth: "import api from '../lib/api';\n\nexport const authService = {\n  login: async (data: any) => api.post('/auth/login', data),\n  logout: async () => api.post('/auth/logout'),\n  getMe: async () => api.get('/auth/me')\n};",
  registration: "import api from '../lib/api';\n\nexport const registrationService = {\n  create: async (data: any) => api.post('/registrations', data),\n  get: async (id: string) => api.get('/registrations/' + id),\n  cancel: async (id: string) => api.post('/registrations/' + id + '/cancel')\n};",
  team: "import api from '../lib/api';\n\nexport const teamService = {\n  create: async (data: any) => api.post('/teams', data),\n  join: async (code: string) => api.post('/teams/join', { code }),\n  get: async (id: string) => api.get('/teams/' + id),\n  update: async (id: string, data: any) => api.put('/teams/' + id, data)\n};",
  payment: "import api from '../lib/api';\n\nexport const paymentService = {\n  createOrder: async (data: any) => api.post('/payments/order', data),\n  verifyPayment: async (data: any) => api.post('/payments/verify', data)\n};",
  ticket: "import api from '../lib/api';\n\nexport const ticketService = {\n  get: async (id: string) => api.get('/tickets/' + id),\n  download: async (id: string) => api.get('/tickets/' + id + '/download', { responseType: 'blob' })\n};",
  score: "import api from '../lib/api';\n\nexport const scoreService = {\n  submit: async (data: any) => api.post('/scores', data),\n  get: async (teamId: string) => api.get('/scores/' + teamId),\n  getLeaderboard: async () => api.get('/scores/leaderboard')\n};",
  admin: "import api from '../lib/api';\n\nexport const adminService = {\n  getRegistrations: async () => api.get('/admin/registrations'),\n  scanQR: async (data: any) => api.post('/admin/scan', data),\n  getAnalytics: async () => api.get('/admin/analytics')\n};",
};

apps.forEach(app => {
  const libDir = path.join(__dirname, 'apps', app, 'src', 'lib');
  const servicesDir = path.join(__dirname, 'apps', app, 'src', 'services');

  fs.mkdirSync(libDir, { recursive: true });
  fs.mkdirSync(servicesDir, { recursive: true });

  fs.writeFileSync(path.join(libDir, 'api.ts'), apiContent);

  Object.keys(stubs).forEach(svc => {
    fs.writeFileSync(path.join(servicesDir, svc + '.service.ts'), stubs[svc]);
  });
  
  console.log('Scaffolded API and services for apps/' + app);
});
