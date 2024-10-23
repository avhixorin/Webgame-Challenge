import React from "react";
import AlphaContainer from "./AlphaContainer/AlphaContainer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const Game: React.FC = () => {
  const letters = [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z",
  ];

  return (
    <div className="w-full p-4 h-screen flex gap-4 bg-grad bg-cover bg-center">
      {/* Game area */}
      <main
        className="w-3/4 h-full bg-[rgba(255, 255, 255, 0.2)] rounded-md border border-[rgba(255, 255, 255, 0.4)] backdrop-blur-lg flex flex-col justify-between"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* Alphabet display area */}
        <div className="w-full py-4 flex justify-center items-center flex-wrap gap-6">
          {letters.map((letter) => (
            <AlphaContainer key={letter} alphabet={letter} />
          ))}
        </div>

        {/* Input Section */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">Input Section</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Enter something..."
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* PowerUps Section */}
        <CardContent className="p-2 sm:p-4 md:p-6">
          <Card className="bg-green-500">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl md:text-2xl">PowerUps Section</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <Button variant="secondary" className="text-sm sm:text-base">
                Power Up 1
              </Button>
              <Button variant="secondary" className="text-sm sm:text-base">
                Power Up 2
              </Button>
              <Button variant="secondary" className="text-sm sm:text-base">
                Power Up 3
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </main>

      {/* Chat section */}
      <aside
        className="w-1/4 h-full bg-[rgba(255, 255, 255, 0.2)]  backdrop-blur-lg"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Card className="h-full flex flex-col bg-transparent">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 mb-4 p-2 sm:p-4 rounded-md border h-[200px] lg:h-[400px]">
              <div className="space-y-4">
                <p className="text-sm sm:text-base">Chat content goes here...</p>
                <p className="text-sm sm:text-base">More chat messages...</p>
                <p className="text-sm sm:text-base">Even more chat messages...</p>
              </div>
            </ScrollArea>
            <Separator className="my-2" />
            <div className="flex items-center space-x-2">
              <Input type="text" placeholder="Type a message..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};

export default Game;
