import { Server, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { Express } from 'express';
import roomHandlerInstance from "../socketHandlers/handleAllRooms";
import { HostRoomData, JoinRoomData, MessageData, OnlineUser, RegisterData, UserData } from '../../types/Types';
import { SOCKET_EVENTS } from '../../constants/SocketEvents';
import ApiError from '../ApiError/ApiError';

dotenv.config();

const PORT = process.env.PORT || 5000;

let users: OnlineUser[] = [];

const connectSocket = (app: Express) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN || '*',
    },
  });

  io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
    console.log('A user connected:', socket.id);

    socket.on(SOCKET_EVENTS.REGISTER, (data: RegisterData) => {
      if (data.user) {
        users.push({ userData: data.user, socketId: socket.id });
        console.log(`User registered: ${data.user.username} with socket ID ${socket.id}`);
        socket.emit(SOCKET_EVENTS.REGISTRATION_RESPONSE, { data: "Registered Successfully" });
      }
    });

    socket.on(SOCKET_EVENTS.HOST_ROOM, ({ room, user }: HostRoomData) => {
      if (room.roomId && room.roomPassword && user) {
        console.log("The request to host the room is received");
        console.log("The room details are:", room);
        console.log("The user details are:", user);
        const response = roomHandlerInstance.hostRoom(room, user, socket);

        if (response && response.statusCode === 200) {
          socket.emit(SOCKET_EVENTS.HOSTING_RESPONSE, response);
          console.log(`Room ${room.roomId} created and user ${user.username} joined.`);
        } else {
          socket.emit(SOCKET_EVENTS.HOSTING_RESPONSE, new ApiError(500, "Error while hosting the room"));
        }
      }
    });

    socket.on(SOCKET_EVENTS.JOIN_ROOM, ({ room, user }: JoinRoomData) => {
      if (room.roomId && room.roomPassword && user) {
        console.log("The request to join the room is received");
        // console.log("The room details are:", room);
        // console.log("The user details are:", user);
        const response = roomHandlerInstance.joinRoom(room.roomId, room.roomPassword, user, socket);

        if (response.statusCode === 200) {
          socket.emit(SOCKET_EVENTS.JOINING_RESPONSE, response);
          console.log(`User ${user.username} joined room ${room.roomId}.`);
        } else {
          socket.emit(SOCKET_EVENTS.JOINING_RESPONSE, new ApiError(500, "Error while joining the room"));
        }
      }
    });

    socket.on(SOCKET_EVENTS.MESSAGE_RECEIVE, (data: MessageData) => {
      if (data.message) {
        console.log("The message received is:", data.message);
        io.to(data.message.roomId).emit(SOCKET_EVENTS.MESSAGE_SEND, data.message.content);
      }
    });

    socket.on(SOCKET_EVENTS.ENQUIRY, ({ roomId }: { roomId: string }) => {
      const roomExists = roomHandlerInstance.getRoomById(roomId);
      const responseMessage = roomExists ? "The room exists" : "The room does not exist";
      socket.emit(SOCKET_EVENTS.ENQUIRY_RESPONSE, responseMessage);
    });

    socket.on("disconnect", (reason) => {
      console.log(`User with socket ID ${socket.id} disconnected due to: ${reason}`);
    });    
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

export default connectSocket;
