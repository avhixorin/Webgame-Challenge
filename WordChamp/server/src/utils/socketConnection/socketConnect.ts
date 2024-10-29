import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { Express } from 'express';
import roomHandlerInstance from "../socketHandlers/handleAllRooms";
import { HostRoomData, JoinRoomData, MessageData, OnlineUser, RegisterData }  from '../../types/Types';



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

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on("register", (data: RegisterData) => {
      if (data.user) {
        users.push({ userId: data.user.userId, socketId: socket.id });
        console.log(`User registered: ${data.user.userId} with socket ID ${socket.id}`);
        socket.emit("registerResponse", { data: "Registered Successfully" });
      }
    });

    socket.on("createRoom", ({ room, user }: HostRoomData) => {
      if (room.roomId && room.roomPassword && user) {
        const response = roomHandlerInstance.hostRoom(room.roomId, room.roomPassword, user, socket);

        if (response.statusCode === 200) {
          socket.join(room.roomId);
          socket.emit("createRoomResponse", "Room created successfully");
          console.log(`Room ${room.roomId} created and user ${user.userId} joined.`);
        } else {
          socket.emit("createRoomResponse", response.message);
        }
      }
    });

    socket.on("joinRoom", ({ room, user }: JoinRoomData) => {
      if (room.roomId && room.roomPassword && user) {
        const response = roomHandlerInstance.joinRoom(room.roomId, room.roomPassword, user, socket);

        if (response.statusCode === 200) {
          socket.join(room.roomId);
          socket.emit("joinRoomResponse", "Joined room successfully");
          console.log(`User ${user.userId} joined room ${room.roomId}.`);
        } else {
          socket.emit("joinRoomResponse", response.message);
        }
      }
    });

    socket.on("message", (data: MessageData) => {
      if (data.message) {
        console.log("The message received is:", data.message);
        io.to(data.message.roomId).emit("messageResponse", data.message.content);
      }
    });

    socket.on("enquiry", ({ roomId }) => {
      const roomExists = roomHandlerInstance.getRoomById(roomId);
      const responseMessage = roomExists ? "The room exists" : "The room does not exist";
      socket.emit("enquiryResponse", responseMessage);
    });

    socket.on('disconnect', () => {
      users = users.filter(u => u.socketId !== socket.id);
      console.log(`User with socket ID ${socket.id} disconnected`);
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

export default connectSocket;
