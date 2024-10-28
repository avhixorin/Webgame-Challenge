import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000');
    
    const handleEventA = (data) => {
      console.log('Received data for Event A:', data);
    };

    const handleEventB = (data) => {
      console.log('Received data for Event B:', data);
      socket.emit('responseToEventB', { response: 'Your data here' });
    };

    socket.on('eventA', handleEventA);
    socket.on('eventB', handleEventB);
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('eventA', handleEventA);
      socket.off('eventB', handleEventB);
      socket.disconnect();
    };
  }, []);
};

export default useSocket;
