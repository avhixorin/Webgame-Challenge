import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import handleHosting from '../socketHandlers/handleHosting';
import handleJoining from '../socketHandlers/handleJoining';
dotenv.config();

const PORT = process.env.PORT || 5000;

const connectSocket = (app: any) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN || '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');


    socket.on("hostRoom",(data) => {
      handleHosting(data);
    })

    socket.on("joinRoom",(data) => {
      handleJoining(data);
    })

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

export default connectSocket;
