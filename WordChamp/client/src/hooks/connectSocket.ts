import { User } from '@/Redux/features/userSlice';
import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const socket = io('http://localhost:3000');

  const hostRoom = (roomId: string, roomPassword: string,user:User) => {
    const newRoom = {
      roomId,
      roomPassword
    }
    socket.emit("hostRoom", { newRoom, user });
  };
  console.log("The is rendering in the useSecket hook")

  const joinRoom = (roomId: string, roomPassword: string,user:User) => {
    const newRoom = {
      roomId,
      roomPassword
    }
    socket.emit("joinRoom", { newRoom, user });
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.emit("announce",{
      name:"laila"
    })

    socket.on("hostingResponse",(data) => {
      console.log(data)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    return () => {
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { hostRoom, joinRoom };
};

export default useSocket;
