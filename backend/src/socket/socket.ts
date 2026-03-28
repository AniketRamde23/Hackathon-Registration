import { Server, Socket } from 'socket.io';
import { admin } from '../config/firebase';

export function initSocket(io: Server) {

  // Auth middleware for socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication required'));
      
      const decoded = await admin.auth().verifyIdToken(token);
      socket.data.user = decoded;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const user = socket.data.user;
    console.log(`Socket connected: \${user.uid}`);

    // Join room based on role
    socket.join(`user:\${user.uid}`);

    // Judges and admins join leaderboard room
    if (user.role === 'judge' || user.role === 'admin') {
      socket.join('leaderboard');
    }

    // Admins join admin room
    if (user.role === 'admin' || user.role === 'moderator') {
      socket.join('admin');
    }

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: \${user.uid}`);
    });
  });
}
