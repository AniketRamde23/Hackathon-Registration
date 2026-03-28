import { useEffect, useState } from 'react';
import socket from '../lib/socket';

export const usePaymentStatus = (userId: string) => {
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handler = (data: { ticket: any }) => {
      console.log('Payment success event resolved:', data);
      setTicket(data.ticket);
    };

    socket.on('payment:success', handler);

    return () => {
      socket.off('payment:success', handler);
    };
  }, [userId]);

  return { ticket };
};
