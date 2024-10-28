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
    console.log(`Joining Room ID: ${joinRoomId} with password: ${joinRoomPassword}`);
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 p-8">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg flex flex-col items-center gap-6">
        
        {/* Header Buttons */}
        <div className="flex gap-4">
          {!isJoiningRoom && (
            <Button
              onClick={() => setIsHosting(prev => !prev)}
              className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-lg shadow-md transition"
            >
              {isHosting ? 'Cancel Host' : 'Host'}
            </Button>
          )}
          {!isHosting && (
            <Button
              onClick={() => setIsJoiningRoom(prev => !prev)}
              className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 rounded-lg shadow-md transition"
            >
              {isJoiningRoom ? 'Cancel Join' : 'Join Room'}
            </Button>
          )}
        </div>

        {/* Host Room Section */}
        {isHosting && (
          <div className="w-full px-4 py-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col gap-4">
            <input
              type="text"
              value={roomId}
              readOnly
              className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Room Password"
              value={roomPassword}
              onChange={(e) => setRoomPasswordInput(e.target.value)}
              className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
        )}

        {/* Join Room Section */}
        {isJoiningRoom && !isHosting && (
          <div className="w-full px-4 py-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col gap-4">
            <input
              type="text"
              placeholder="Room ID"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Room Password"
              value={joinRoomPassword}
              onChange={(e) => setJoinRoomPassword(e.target.value)}
              className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
            />
            <Button
              onClick={handleJoinRoom}
              className="w-full text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 rounded-lg shadow-md transition"
            >
              Join Room
            </Button>
          </div>
        )}

        {/* Start Game Button */}
        {isHosting && (
          <Button
            onClick={handleStartGame}
            disabled={!isHosting || roomPassword.trim() === ''}
            className="w-full text-white bg-purple-700 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 rounded-lg shadow-md transition disabled:bg-purple-400"
          >
            Start Game
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page2;
