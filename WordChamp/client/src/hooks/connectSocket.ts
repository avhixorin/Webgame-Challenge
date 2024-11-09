import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@/constants/ClientSocketEvents";
import {
  hostingResponse,
  joiningResponse,
  leaveRoomResponse,
  Message,
  newUserResponse,
  noOfUsersResponse,
  Room,
  RoomStatus,
  User,
  UserCountResponse,
} from "@/types/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addMembersToRoom,
  removeMembersFromRoom,
  setCurrentParticipants,
} from "@/Redux/features/roomSlice";
import { addMessage } from "@/Redux/features/messageSlice";
import { RootState } from "@/Redux/store/store";

// Singleton Socket instance
let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3000", { autoConnect: false });
  }
  return socket;
};

const useSocket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const roomStatus = useSelector((state: RootState) => state.room.status);

  // Connect socket if not already connected
  const socket = initializeSocket();

  // Event handler functions with debug logs
  const handleHostingResponse = (response: hostingResponse) => {
    if (response?.statusCode === 200) {
      toast.success(
        response.message || "Room hosted successfully! Redirecting..."
      );
      dispatch(setCurrentParticipants(response.data.userCount || 1));
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
      toast.success(
        response.message || "Joined room successfully! Redirecting..."
      );
      dispatch(setCurrentParticipants(response.data.userCount || 1));
      response.data.allUsers.forEach((user) => {
        dispatch(addMembersToRoom(user));
      });
      navigate("/waiting-room");
    } else {
      toast.error("Unable to join room. Please try again later.");
    }
  };

  const handleUserCount = (response: UserCountResponse) => {
    dispatch(setCurrentParticipants(response.userCount));
  };

  const handleLeaveRoom = (data: leaveRoomResponse) => {
    console.log("User left response:", data);
    toast(`${data.message}`, {
      icon: "👋",
      style: { background: "rgba(255, 0, 0, 0.8)", color: "#fff" },
    });
    dispatch(removeMembersFromRoom(data.userId));
  };

  const handleNewUser = (data: newUserResponse) => {
    console.log("New user response:", data);
    toast(`${data.message}`, {
      icon: "👋",
      style: { background: "rgba(0, 255, 0, 0.8)", color: "#fff" },
    });
    dispatch(addMembersToRoom(data.user));
  };

  const handleNewMessage = (data: Message) => {
    console.log("New message response:", data);
    dispatch(addMessage(data));
  };

  const hostRoom = (room: Room, user: User) => {
    console.log("Emitting HOST_ROOM event:", { room, user });
    socket.emit(SOCKET_EVENTS.HOST_ROOM, { room, user });
    socket.on(SOCKET_EVENTS.NO_OF_USERS, (response: noOfUsersResponse) => {
      handleUserCount(response);
    });
    socket.on(SOCKET_EVENTS.LEAVE_ROOM, (response: leaveRoomResponse) => {
      handleLeaveRoom(response);
    });
    socket.on(SOCKET_EVENTS.NEW_USER, (response: newUserResponse) => {
      handleNewUser(response);
    });
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, (response: Message) => {
      handleNewMessage(response);
    });
  };

  const joinRoom = (room: Room, user: User) => {
    console.log("Emitting JOIN_ROOM event:", { room, user });
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, user });
    socket.on(SOCKET_EVENTS.NO_OF_USERS, (response: noOfUsersResponse) => {
      handleUserCount(response);
    });
    socket.on(SOCKET_EVENTS.LEAVE_ROOM, (response: leaveRoomResponse) => {
      handleLeaveRoom(response);
    });
    socket.on(SOCKET_EVENTS.NEW_USER, (response: newUserResponse) => {
      handleNewUser(response);
    });
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, (response: Message) => {
      handleNewMessage(response);
    });
  };

  useEffect(() => {
    if (socket && !socket.connected) {
      socket.connect();
    }

    socket.on(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
    socket.on(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
    socket.on(SOCKET_EVENTS.NO_OF_USERS, handleUserCount);

    return () => {
      socket.off(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
      socket.off(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
      socket.off(SOCKET_EVENTS.NO_OF_USERS, handleUserCount);
      socket.off(SOCKET_EVENTS.LEAVE_ROOM, handleLeaveRoom);
      socket.off(SOCKET_EVENTS.NEW_USER, handleNewUser);
      socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomStatus, user]);

  return { hostRoom, joinRoom };
};

export default useSocket;
