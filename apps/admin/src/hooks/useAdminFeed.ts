import { useEffect, useState } from 'react';
import socket from '../lib/socket';

export const useAdminFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onRegistration = (data: { user: any, registrationId: string }) => {
      setFeed(prev => [{ type: 'REGISTRATION', ...data, time: new Date() }, ...prev]);
    };

    const onScan = (data: { ticket: any, user: any }) => {
      setFeed(prev => [{ type: 'SCAN', ...data, time: new Date() }, ...prev]);
    };

    socket.on('registration:new', onRegistration);
    socket.on('ticket:scanned', onScan);

    return () => {
      socket.off('registration:new', onRegistration);
      socket.off('ticket:scanned', onScan);
    };
  }, []);

  return { feed };
};
