import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const socket = io('http://localhost:3000');

  const hostRoom = (roomId: string, roomPassword: string) => {
    socket.emit("hostRoom", { roomId, roomPassword });
  };
  console.log("The is rendering in the useSecket hook")

  const joinRoom = (roomId: string, roomPassword: string) => {
    socket.emit("joinRoom", { roomId, roomPassword });
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.emit("announce",{
      name:"laila"
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    return () => {
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { hostRoom, joinRoom };
};

export default useSocket;
