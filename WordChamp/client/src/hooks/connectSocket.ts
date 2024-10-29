import { User } from '@/Redux/features/userSlice';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const useSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3000');
  }

  const hostRoom = (roomId: string, roomPassword: string, user: User) => {
    const newRoom = {
      roomId,
      roomPassword
    };
    socket?.emit("hostRoom", { newRoom, user });
  };

  const joinRoom = (roomId: string, roomPassword: string, user: User) => {
    const newRoom = {
      roomId,
      roomPassword
    };
    socket?.emit("joinRoom", { newRoom, user });
  };

  useEffect(() => {
    // Log connection
    socket?.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for responses
    socket?.on("hostingResponse", (data) => {
      console.log(data);
    });

    // Log disconnection
    socket?.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Clean up listeners on unmount
    return () => {
      socket?.off('connect');
      socket?.off('hostingResponse');
      socket?.off('disconnect');
    };
  }, []);

  return { hostRoom, joinRoom };
};

export default useSocket;
