import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '@/constants/SocketEvents';
import { hostingResponse, joiningResponse, Room, User } from '@/types/types';
import { toast } from './use-toast';
import { useNavigate } from 'react-router-dom';

let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:3000', { autoConnect: false });
  }
  return socket;
};

const useSocket = () => {
  const socket = initializeSocket();
  const navigate = useNavigate()
  const handleHostingResponse = (response: hostingResponse) => {
    if (response?.statusCode === 200) {
      toast({
        title: response.message,
        description: '',
        className: 'bg-white/25 rounded-md border border-white/20 backdrop-blur-lg text-white',
      });
      navigate("/game")
    } else {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Unable to host room.',
        className: 'bg-red-500 rounded-md border border-red-400 backdrop-blur-lg text-white',
      });
    }
  };

  const handleJoiningResponse = (response: joiningResponse) => {
    if (response?.statusCode === 200) {
      toast({
        title: response.message,
        description: '',
        className: 'bg-white/25 rounded-md border border-white/20 backdrop-blur-lg text-white',
      });
      navigate("/game")
    } else {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Unable to join room.',
        className: 'bg-red-500 rounded-md border border-red-400 backdrop-blur-lg text-white',
      });
    }
  };

  const hostRoom = (room: Room, user: User) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.HOST_ROOM, { room, user });
    socket.once(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
  };

  const joinRoom = (room: Room, user: User) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, user });
    socket.once(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
  };

  useEffect(() => {
    const handleConnect = () => console.log('Connected to server');
    const handleDisconnect = () => console.log('Disconnected from server');

    socket.connect();
    socket.on(SOCKET_EVENTS.CONNECT, handleConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT, handleDisconnect);

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, handleConnect);
      socket.off(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
      socket.disconnect();
    };
  }, [socket]);

  return { hostRoom, joinRoom };
};

export default useSocket;
