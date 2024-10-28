import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import useRoomID from '@/hooks/getRoomId';
import { setRoomId, setRoomPassword } from '@/Redux/features/roomSlice';
import { RootState } from '@/Redux/store/store';

const Page2: React.FC = () => {
  const dispatch = useDispatch();
  const { createRoomId } = useRoomID();
  
  const [isHosting, setIsHosting] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [roomPassword, setRoomPasswordInput] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinRoomPassword, setJoinRoomPassword] = useState('');

  const roomId = useSelector((state: RootState) => state.room.roomId);

  useEffect(() => {
    if (isHosting) {
      dispatch(setRoomId(createRoomId()));
    }
  }, [isHosting, createRoomId, dispatch]);

  const handleStartGame = () => {
    if (roomPassword.trim() === '') {
      alert('Please enter a room password to start the game');
      return;
    }
    dispatch(setRoomPassword(roomPassword));
    console.log('Starting Game...');
  };

  const handleJoinRoom = () => {
    if (joinRoomId.trim() === '' || joinRoomPassword.trim() === '') {
      alert('Please enter both Room ID and Room Password to join');
      return;
    }
    // Add logic to verify room credentials before proceeding
    console.log(`Joining Room ID: ${joinRoomId} with password: ${joinRoomPassword}`);
  };

  return (
    <div className='w-full h-full p-6 flex flex-col justify-center items-center gap-4 bg-fuchsia-500'>
      <div className='px-4 py-2'>
        {!isJoiningRoom && (
          <Button onClick={() => setIsHosting(prev => !prev)}>
            {isHosting ? 'Cancel Host' : 'Host'}
          </Button>
        )}

        {!isHosting && (
          <Button onClick={() => setIsJoiningRoom(prev => !prev)}>
            {isJoiningRoom ? 'Cancel Join' : 'Join Room'}
          </Button>
        )}
      </div>

      {isHosting && (
        <div className='w-1/2 px-4 py-2 flex flex-col gap-2'>
          <input type='text' value={roomId} className='px-2 py-1' readOnly />
          <input 
            type='text' 
            placeholder='Room Password' 
            className='px-2 py-1' 
            value={roomPassword}
            onChange={(e) => setRoomPasswordInput(e.target.value)}
          />
        </div>
      )}

      {isJoiningRoom && !isHosting && (
        <div className='w-1/2 px-4 py-2 flex flex-col gap-2'>
          <input 
            type='text' 
            placeholder='Room ID' 
            className='px-2 py-1' 
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
          />
          <input 
            type='text' 
            placeholder='Room Password' 
            className='px-2 py-1' 
            value={joinRoomPassword}
            onChange={(e) => setJoinRoomPassword(e.target.value)}
          />
          <Button onClick={handleJoinRoom}>Join Room</Button>
        </div>
      )}

      <Button
        onClick={handleStartGame}
        disabled={!isHosting || roomPassword.trim() === ''}
      >
        Start Game
      </Button>
    </div>
  );
};

export default Page2;
