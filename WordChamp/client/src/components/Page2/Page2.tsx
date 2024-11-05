import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRoomID from '@/hooks/getRoomId';
import { setRoomId, setRoomPassword, setRoomStatus } from '@/Redux/features/roomSlice';
import useSocket from '@/hooks/connectSocket';
import { RootState } from '@/Redux/store/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { gameMode as GameModes, Room, RoomStatus } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import { Volume, VolumeX } from 'lucide-react';
import useSound from '@/hooks/useSound';
import Rules from '../Game/Rules/Rules';
import { setGameMode } from '@/Redux/features/userGameDataSlice';
import CTAButton from '@/utils/CTAbutton/CTAbutton';

const Page2: React.FC = () => {
  const dispatch = useDispatch();
  const { createRoomId } = useRoomID();

  const { hostRoom, joinRoom } = useSocket();
  const [isHosting, setIsHosting] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [localMode, setLocalMode] = useState<GameModes | null>(null);
  const [muted, setMuted] = useState(false);

  const {playBackgroundMusic,stopBackgroundMusic} = useSound()


  const roomId = useSelector((state: RootState) => state.room.roomId);
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const gameMode = useSelector((state: RootState) => state.userGameData.gameMode);
  const [isModeSelected, setIsModeSelected] = useState(false);
  useEffect(() => {
    if (muted) stopBackgroundMusic();
    else playBackgroundMusic("./sounds/background1.mp3");
  }, [muted, playBackgroundMusic, stopBackgroundMusic]);

  useEffect(() => {
    if (isHosting) dispatch(setRoomId(createRoomId()));
  }, [isHosting, createRoomId, dispatch]);

  const validationSchema = Yup.object({
    roomPassword: Yup.string().required('Room password is required'),
    roomId: Yup.string().when('$isJoining', {
      is: true,
      then: Yup.string().required('Room ID is required'),
    }),
  });

  const handleGameModeChange = (mode: GameModes) => {
    setLocalMode(mode);
    setIsModeSelected(true);
    dispatch(setGameMode(mode));
    if(mode === GameModes.SOLO){
      navigate('/game')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-game-bg bg-center p-4">
      <button onClick={() => setMuted(!muted)} className="absolute top-10 left-10 z-10">
        {muted ? <VolumeX size={32} stroke="#fdfdfd" /> : <Volume size={32} stroke="#fdfdfd" />}
      </button>

      <Rules />

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-white">Mode Selection</h1>
        {
          !localMode && (
            <div className="flex gap-4">
              <CTAButton type='button' disabled={false} label="Solo" colour="#2563eb" onClick={() => handleGameModeChange(GameModes.SOLO)} />
              <CTAButton type='button' disabled={false} label="Multiplayer" colour="#16a34a" onClick={() => handleGameModeChange(GameModes.MULTIPLAYER)} />
            </div>
          )
        }

        {localMode && (
          gameMode === GameModes.MULTIPLAYER && (
            <div className="flex gap-4">
              {!isJoiningRoom && (
                <CTAButton type='button' disabled={false} label={isHosting ? 'Cancel Host' : 'Host'} colour="#2563eb" onClick={() => setIsHosting((prev) => !prev)} />
                
              )}
              {!isHosting && (
                <CTAButton type='button' disabled={false} label={isJoiningRoom ? 'Cancel Join' : 'Join Room'} colour="#16a34a" onClick={() => setIsJoiningRoom((prev) => !prev)} />
                
              )}
            </div>
          )
        )}

        {isHosting && (
          <div className="w-full px-4 py-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col gap-4">
            <Formik
              initialValues={{ roomPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (user) {
                  const room: Room = { roomId, roomPassword: values.roomPassword };
                  hostRoom(room, user);
                  dispatch(setRoomStatus(RoomStatus.HOSTING));
                  dispatch(setRoomPassword(values.roomPassword));
                } else {
                  console.error('User is not logged in');
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <input type="text" value={roomId} readOnly className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none" />
                  <Field type="password" name="roomPassword" placeholder="Room Password" className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none" />
                  <ErrorMessage name="roomPassword" component="div" className="text-red-600" />
                  <CTAButton type={"submit"} disabled={isSubmitting} label="Host Game" colour="#7e22ce" onClick={() => {}} />
                  
                </Form>
              )}
            </Formik>
          </div>
        )}

        {isJoiningRoom && !isHosting && (
          <div className="w-full px-4 py-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col gap-4">
            <Formik
              initialValues={{ roomId: '', roomPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (user) {
                  const room: Room = { roomId: values.roomId, roomPassword: values.roomPassword };
                  joinRoom(room, user);
                  dispatch(setRoomStatus(RoomStatus.JOINING));
                  dispatch(setRoomPassword(values.roomPassword));
                } else {
                  console.error('User is not logged in');
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field type="text" name="roomId" placeholder="Room ID" className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none" />
                  <ErrorMessage name="roomId" component="div" className="text-red-600" />
                  <Field type="password" name="roomPassword" placeholder="Room Password" className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none" />
                  <ErrorMessage name="roomPassword" component="div" className="text-red-600" />
                  <CTAButton type={"submit"} disabled={isSubmitting} label="Join Room" colour="#16a34a" onClick={() => {}} />
                  
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page2;
