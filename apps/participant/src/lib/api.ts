import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const redirectToLogin = () => {
  if (typeof window !== 'undefined') window.location.href = '/register';
};

// Explicit Authorization is ignored since withCredentials dynamically 
// transmits secure HttpOnly cookies across the boundary natively.
api.interceptors.request.use((config) => {
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
