import { io } from 'socket.io-client';

const getFirebaseToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('token') || 'mock-token' : 'mock-token';
};

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', {
  auth: { token: getFirebaseToken() },
  autoConnect: false,
});

export default socket;
