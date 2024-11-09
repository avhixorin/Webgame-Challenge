import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store/store';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CTAButton from '@/utils/CTAbutton/CTAbutton';
import useSocket from '@/hooks/connectSocket';

const ChatSection: React.FC = () => {
  const messages = useSelector((state: RootState) => 
    Array.isArray(state.message.messages) ? state.message.messages : []
  );
  const { sendMessage } = useSocket();
  // Validation schema for message input
  const validationSchema = Yup.object({
    message: Yup.string().required('Message cannot be empty'),
  });
  const { user } = useSelector((state: RootState) => state.user);
  const { roomId } = useSelector((state: RootState) => state.room);
  const handleSendMessage = (values: { message: string }) => {
    if(!user) return;
    sendMessage({ message: values.message, sender: user, roomId: roomId });
    console.log('Sending message:', values.message);
  };

  return (
    <div
      className="w-full max-h-60 bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-lg border-none"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Card className="h-full flex flex-col bg-transparent">
        <CardHeader className="p-3">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">
            Chats
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-2 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div 
                  key={msg.sender.id} 
                  className="p-2 mb-2 w-[85%] rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-black"
                >
                  <p className="text-sm text-gray-800 font-semibold">{msg.sender.username}</p>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">No messages yet.</p>
            )}
          </ScrollArea>
          <Separator />
          <div className="w-full flex items-center gap-2 mt-2">
            <Formik
              initialValues={{ message: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleSendMessage(values);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex w-full gap-2 items-center">
                  <Field
                    name="message"
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
                  />
                  <ErrorMessage name="message" component="div" className="text-red-600" />
                  <CTAButton
                    type="submit"
                    disabled={isSubmitting}
                    label="Send"
                    colour="#7e22ce"
                    onClick={() => {}}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSection;
