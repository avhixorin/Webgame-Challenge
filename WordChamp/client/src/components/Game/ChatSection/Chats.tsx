import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
}

const dummyMessages: ChatMessage[] = [
  { id: 1, sender: 'Alice', message: 'Hey, how are you?', timestamp: '10:00 AM' },
  { id: 2, sender: 'Bob', message: 'I’m good! Working on the project.', timestamp: '10:02 AM' },
  { id: 3, sender: 'Alice', message: 'Nice! Need any help?', timestamp: '10:05 AM' },
  { id: 4, sender: 'Bob', message: 'Maybe with the UI adjustments.', timestamp: '10:07 AM' },
  { id: 4, sender: 'Bob', message: 'Maybe with the UI adjustments.', timestamp: '10:07 AM' },
  { id: 4, sender: 'Bob', message: 'Maybe with the UI adjustments.', timestamp: '10:07 AM' },
];

const ChatSection: React.FC = () => {
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
            {dummyMessages.map((msg) => (
              <div key={msg.id} className="p-2 mb-2 w-[85%] rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-black">
                <p className="text-sm text-gray-800 font-semibold">{msg.sender}</p>
                <p className="text-gray-700">{msg.message}</p>
              </div>
            ))}
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
