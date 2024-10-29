import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '@/constants/SocketEvents';
import { hostingResponse, joiningResponse, Room, User } from '@/types/types';

let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:3000');
  }
  return socket;
};

const useSocket = () => {
  const socket = initializeSocket();

  const handleHostingResponse = (response: hostingResponse) => {
    console.log("Hosting response received:", response);
  };

  const handleJoiningResponse = (response: joiningResponse) => {
    console.log("Joining response received:", response);
  };

  const hostRoom = (room: Room, user: User) => {
    socket.emit(SOCKET_EVENTS.HOST_ROOM, { room, user });
    socket.once(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
  };

  const joinRoom = (room: Room, user: User) => {
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, user });
    socket.once(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
  };

  useEffect(() => {
    const handleConnect = () => console.log('Connected to server');
    const handleDisconnect = () => console.log('Disconnected from server');

    socket.on(SOCKET_EVENTS.CONNECT, handleConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT, handleDisconnect);

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, handleConnect);
      socket.off(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
    };
  }, [socket]);

  return { hostRoom, joinRoom };
};

export default useSocket;
