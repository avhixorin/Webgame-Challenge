import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '@/constants/SocketEvents';
import { hostingResponse, joiningResponse, Room, User, UserCountResponse } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setParticipantsOfRoom } from '@/Redux/features/roomSlice';

let socket: Socket | null = null;

// Initialize socket only once with autoConnect enabled
const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:3000', { autoConnect: true });
  }
  return socket;
};

const useSocket = () => {
  const socket = initializeSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hosting response handler
  const handleHostingResponse = (response: hostingResponse) => {
    if (response?.statusCode === 200) {
      toast.success(response.message || "Room hosted successfully! Redirecting...");
      console.log("Hosting response:", response);
      navigate("/waiting-room");
    } else {
      console.log("Hosting error response:", response);
      toast.error("Hosting the room was unsuccessful.");
    }
  };

  // Joining response handler
  const handleJoiningResponse = (response: joiningResponse) => {
    if (response?.statusCode === 200) {
      toast.success(response.message || "Joined room successfully! Redirecting...");
      console.log("Joining response:", response);
      navigate("/waiting-room");
    } else {
      console.log("Joining error response:", response);
      toast.error("Unable to join room. Please try again later.");
    }
  };

  // User count update handler
  const handleUserCount = (response: UserCountResponse) => {
    if (!response) console.log("No user count response received.");
    console.log("User count response:", response);
    dispatch(setParticipantsOfRoom(response.userCount));
  };

  // Host room
  const hostRoom = (room: Room, user: User) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.HOST_ROOM, { room, user });
    socket.on(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
  };

  // Join room
  const joinRoom = (room: Room, user: User) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, user });
    socket.on(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
  };

  useEffect(() => {
    // Check and log connection status
    const handleConnect = () => {
      console.log('Connected to server with socket ID:', socket?.id);
    };

    const handleDisconnect = (reason: string) => {
      console.log(`Socket ${socket?.id} disconnected due to: ${reason}`);
    };

    if (socket) {
      // Connect socket and log the connection status
      if (!socket.connected) {
        socket.connect();
      }
      socket.on(SOCKET_EVENTS.CONNECT, handleConnect);
      socket.on(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
      socket.on(SOCKET_EVENTS.NO_OF_USERS, handleUserCount);
    }

    return () => {
      // Clean up only listeners without disconnecting
      socket?.off(SOCKET_EVENTS.CONNECT, handleConnect);
      socket?.off(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
      socket?.off(SOCKET_EVENTS.NO_OF_USERS, handleUserCount);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { hostRoom, joinRoom };
};

export default useSocket;
