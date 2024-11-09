import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '@/constants/SocketEvents';
import {
  hostingResponse,
  joiningResponse,
  leaveRoomResponse,
  Message,
  newUserResponse,
  Room,
  RoomStatus,
  User,
  UserCountResponse,
} from '@/types/types';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { addMembersToRoom, removeMembersFromRoom, setCurrentParticipants } from '@/Redux/features/roomSlice';
import { addMessage } from '@/Redux/features/messageSlice';
import { RootState } from '@/Redux/store/store';

let socket: Socket | null = null;

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
  const { user } = useSelector((state: RootState) => state.user);
  const roomStatus = useSelector((state: RootState) => state.room.status);
  const currentNoOfParticipants = useSelector(
    (state: RootState) => state.room.currentNoOfParticipants
  );

  useEffect(() => {
    console.log("Updated Participants Count:", currentNoOfParticipants);
  }, [currentNoOfParticipants]);

  // Event handler functions
  const handleHostingResponse = (response: hostingResponse) => {
    if (response?.statusCode === 200) {
      toast.success(response.message || "Room hosted successfully! Redirecting...");
      dispatch(setCurrentParticipants(1));
      console.log("Hosting response:", response);
      console.log("User:", user);
      if (user && roomStatus === RoomStatus.HOSTING) {
        dispatch(addMembersToRoom(user));
      }
      navigate("/waiting-room");
    } else {
      toast.error("Hosting the room was unsuccessful.");
    }
  };

  const handleJoiningResponse = (response: joiningResponse) => {
    if (response?.statusCode === 200) {
      toast.success(response.message || "Joined room successfully! Redirecting...");
      console.log("Joining response:", response);
      console.log("User:", response.data?.user);
      if (response.data?.user) dispatch(addMembersToRoom(response.data.user));
      navigate("/waiting-room");
    } else {
      toast.error("Unable to join room. Please try again later.");
    }
  };

  const handleUserCount = (response: UserCountResponse) => {
    console.log("User count response received:", response.userCount);
    dispatch(setCurrentParticipants(response.userCount));
  };

  const handleLeaveRoom = (data: leaveRoomResponse) => {
    if (data?.message && data.userId) {
      toast(`${data.message}`, {
        icon: "👋",
        style: {
          background: "rgba(255, 0, 0, 0.8)",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });
      dispatch(removeMembersFromRoom(data.userId));
    }
  };

  const handleNewUser = (data: newUserResponse) => {
    if (data?.message && data.user) {
      toast(`${data.message}`, {
        icon: "👋",
        style: {
          background: "rgba(0, 255, 0, 0.8)",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });
      dispatch(addMembersToRoom(data.user));
    }
  };

  const handleNewMessage = (data: Message) => {
    if (data.message && data.sender) {
      dispatch(addMessage(data));
    }
  };

  // Host and Join Room Functions
  const hostRoom = (room: Room, user: User) => {
    socket?.emit(SOCKET_EVENTS.HOST_ROOM, { room, user });
  };

  const joinRoom = (room: Room, user: User) => {
    socket?.emit(SOCKET_EVENTS.JOIN_ROOM, { room, user });
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected to server with socket ID:', socket?.id);
    };

    const handleDisconnect = (reason: string) => {
      console.log(`Socket ${socket?.id} disconnected due to: ${reason}`);
    };

    if (socket) {
      if (!socket.connected) {
        socket.connect();
      }

      // Register all event listeners once
      socket.on(SOCKET_EVENTS.CONNECT, handleConnect);
      socket.on(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
      socket.on(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
      socket.on(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
      socket.on(SOCKET_EVENTS.NO_OF_USERS, handleUserCount);
      socket.on(SOCKET_EVENTS.LEAVE_ROOM, handleLeaveRoom);
      socket.on(SOCKET_EVENTS.NEW_USER, handleNewUser);
      socket.on(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
    }

    // Clean up event listeners on component unmount
    return () => {
      if (socket) {
        socket.off(SOCKET_EVENTS.CONNECT, handleConnect);
        socket.off(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
        socket.off(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
        socket.off(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
        socket.off(SOCKET_EVENTS.NO_OF_USERS, handleUserCount);
        socket.off(SOCKET_EVENTS.LEAVE_ROOM, handleLeaveRoom);
        socket.off(SOCKET_EVENTS.NEW_USER, handleNewUser);
        socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, navigate, roomStatus, user, dispatch]);

  return { hostRoom, joinRoom };
};

export default useSocket;
