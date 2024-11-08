import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '@/constants/SocketEvents';
import { hostingResponse, joiningResponse, Room, User } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:3000', { autoConnect: false });
  }
  return socket;
};

const useSocket = () => {
  const socket = initializeSocket();
  const navigate = useNavigate();

  const handleHostingResponse = (response: hostingResponse) => {
    if (response?.statusCode === 200) {
      toast.success(response.message || "Room hosted successfully! Redirecting...");
      navigate("/waiting-room");
    } else {
      toast.error("We're sorry, but hosting the room was unsuccessful.");
    }
  };

  const handleJoiningResponse = (response: joiningResponse) => {
    if (response?.statusCode === 200) {
      toast.success(response.message || "Joined room successfully! Redirecting...");
      navigate("/game");
    } else {
      toast.error("Unable to join room. Please try again later.");
    }
  };

  const handleSomeoneJoined = (response) => {
    if(response){
      toast.success(response.message || "Someone joined the room!");
    }
  }

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
    socket.on(SOCKET_EVENTS.SOMEONE_JOINED,handleSomeoneJoined);
    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, handleConnect);
      socket.off(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
      socket.disconnect();
    };
  }, [socket]);

  return { hostRoom, joinRoom };
};

export default useSocket;
