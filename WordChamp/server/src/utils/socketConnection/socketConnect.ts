import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import handleHosting from '../socketHandlers/handleHosting';
import handleJoining from '../socketHandlers/handleJoining';
import ApiResponse from '../ApiResponse/ApiResponse';
import { User } from '../../types/user';

dotenv.config();

const PORT = process.env.PORT || 5000;

interface UserSocket {
  userId: string;
  socketId: string;
}

export let users: UserSocket[] = [];

const connectSocket = (app: any) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN || '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on("register", (data) => {
      const newUser: UserSocket = {
        userId: data?.user?.id,
        socketId: socket.id,
      };
      users.push(newUser);
      console.log(`User registered: ${data?.user?.id} with socket ID ${socket.id}`);
      console.log("The current users array is: ",users)

      socket.emit("registerResponse",{data:"Registered Successfully"})
    });


    socket.on("hostRoom", (data) => {
      console.log("The room data is:", data?.newRoom);
      console.log("The user is:", data?.user);

      if (data?.newRoom && data?.newRoom.roomId && data?.user) {
        const hostingData = handleHosting(data.newRoom, data.user);
        if (hostingData) {
          socket.emit("hostingResponse", hostingData);
        } else {
          socket.emit("hostingResponse", new ApiResponse(500, "Cannot host the room"));
        }
      } else {
        socket.emit("hostingResponse", new ApiResponse(400, "Invalid room or user data"));
      }
    });

    socket.on("joinRoom", (data) => {
      console.log("Join room data:", data);

      if (data?.room && data?.user) {
        const joiningData = handleJoining(data.room, data.user);
        if (joiningData) {
          socket.emit("joiningResponse", joiningData);
        } else {
          socket.emit("joiningResponse", new ApiResponse(500, "Cannot join the room"));
        }
      } else {
        socket.emit("joiningResponse", new ApiResponse(400, "Invalid room or user data"));
      }
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
