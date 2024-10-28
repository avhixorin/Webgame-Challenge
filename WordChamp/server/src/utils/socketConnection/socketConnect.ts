import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import handleHosting from '../socketHandlers/handleHosting';
import handleJoining from '../socketHandlers/handleJoining';
import ApiResponse from '../ApiResponse/ApiResponse';
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
      console.log("The room data is: ",data?.newRoom)
      console.log("The user is: ",data?.user)
      if(data?.newRoom && data?.newRoom.roomId && data?.user){

        const hostingData = handleHosting(data.newRoom,data.user);
        if(hostingData){
          socket.emit("hostingResponse",hostingData)
        }else{
          socket.emit("hostingResponse",new ApiResponse(500,"Cannot host the room"))
        }
      }
      
      
    })

    socket.on("joinRoom",(data) => {
      console.log(data)
      handleJoining(data?.newRoom,data.user);
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
