import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import useRoomID from '@/hooks/getRoomId';
import { setRoomId, setRoomPassword, setRoomStatus } from '@/Redux/features/roomSlice';
import useSocket from '@/hooks/connectSocket';
import { RootState } from '@/Redux/store/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Room, RoomStatus } from '@/types/types';
import { useNavigate } from 'react-router-dom';

const Page2: React.FC = () => {
  const dispatch = useDispatch();
  const { createRoomId } = useRoomID();
  const { hostRoom, joinRoom } = useSocket();
  
  const [isHosting, setIsHosting] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  
  useEffect(() => {
    if (isHosting) {
      dispatch(setRoomId(createRoomId()));
    }
  }, [isHosting, createRoomId, dispatch]);
  
  const roomId = useSelector((state: RootState) => state.room.roomId);

  const validationSchema = Yup.object({
    roomPassword: Yup.string()
      .required('Room password is required'),
    roomId: Yup.string().when('$isJoining', {
      is: true,
      then: Yup.string().required('Room ID is required'),
    }),
  });

  const user = useSelector((state:RootState) => state.user.user);
  const navigate = useNavigate();
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
            <Formik
              initialValues={{ roomPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (user) {
                  const room:Room = {
                    roomId: roomId,
                    roomPassword: values.roomPassword
                  }
                  
                  hostRoom(room, user);
                  dispatch(setRoomId(roomId));
                  dispatch(setRoomStatus(RoomStatus.HOSTING));
                  dispatch(setRoomPassword(values.roomPassword));
                } else {
                  console.error('User is not logged in');
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <input
                    type="text"
                    value={roomId}
                    readOnly
                    className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
                  />
                  <Field
                    type="password"
                    name="roomPassword"
                    placeholder="Room Password"
                    className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
                  />
                  <ErrorMessage name="roomPassword" component="div" className="text-red-600" />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-purple-700 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 rounded-lg shadow-md transition disabled:bg-purple-400"
                  >
                    Host Game
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {/* Join Room Section */}
        {isJoiningRoom && !isHosting && (
          <div className="w-full px-4 py-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col gap-4">
            <Formik
              initialValues={{ roomId: '', roomPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (user) {
                  const room:Room = {
                    roomId: values.roomId,
                    roomPassword: values.roomPassword
                  }
                  joinRoom(room, user);
                  dispatch(setRoomStatus(RoomStatus.JOINING));
                  dispatch(setRoomId(values.roomId));
                  dispatch(setRoomPassword(values.roomPassword));
                } else {
                  console.error('User is not logged in');
                }
              }}
              validateOnChange={false}
              validateOnBlur={false}
              enableReinitialize
              validateOnMount
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    type="text"
                    name="roomId"
                    placeholder="Room ID"
                    className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
                  />
                  <ErrorMessage name="roomId" component="div" className="text-red-600" />
                  <Field
                    type="password"
                    name="roomPassword"
                    placeholder="Room Password"
                    className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
                  />
                  <ErrorMessage name="roomPassword" component="div" className="text-red-600" />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 rounded-lg shadow-md transition"
                  >
                    Join Room
                  </Button>
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
