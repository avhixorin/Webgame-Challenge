import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store/store';

const ChatSection: React.FC = () => {
  const messages = useSelector((state: RootState) => Array.isArray(state.message.messages) ? state.message.messages : []);

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
                <div key={msg.sender.id} className="p-2 mb-2 w-[85%] rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-black">
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
            <Input 
              placeholder="Type a message..." 
              className="flex-1 bg-gray-50 border-gray-300 focus-within:border-none focus:outline-none" 
            />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSection;
