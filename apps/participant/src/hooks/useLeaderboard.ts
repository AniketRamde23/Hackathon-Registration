import { useEffect, useState } from 'react';
import socket from '../lib/socket';

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handler = (data: { teamId: string, newLeaderboard: any[] }) => {
      console.log('Leaderboard array updated:', data);
      if (data.newLeaderboard) {
        setLeaderboard(data.newLeaderboard);
      }
    };

    socket.on('score:updated', handler);

    return () => {
      socket.off('score:updated', handler);
    };
  }, []);

  return { leaderboard };
};
