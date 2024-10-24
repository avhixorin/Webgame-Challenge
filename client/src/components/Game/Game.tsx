import React from "react";
import AlphaContainer from "./AlphaContainer/AlphaContainer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";

const Game: React.FC = () => {
  const letters = [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full p-4 h-screen flex flex-col md:flex-row gap-4 bg-gradient-to-r from-purple-500 to-indigo-600 bg-cover bg-center">
      {/* Game area */}
      <motion.main
        className="w-full md:w-3/4 h-full bg-white/10 rounded-md border border-white/20 backdrop-blur-lg flex flex-col justify-between shadow-lg p-4"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Alphabet display area */}
        <motion.div
          className="w-full py-4 flex justify-center items-center flex-wrap gap-4"
          variants={containerVariants}
        >
          {letters.map((letter) => (
            <AlphaContainer key={letter} alphabet={letter} />
          ))}
        </motion.div>

        {/* Input Section */}
        <Card className="w-full bg-transparent border-none px-20">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-white">Input Section</CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-2 mt-2">
            <Input
              type="text"
              placeholder="Enter something..."
              className="flex-1 text-gray-900"
            />
            <Button className="text-white">Enter</Button>
          </CardContent>
        </Card>

        {/* PowerUps Section */}
        <CardContent className="p-4">
          <Card className="bg-green-500 rounded-md shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl md:text-2xl">PowerUps Section</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4 p-4">
              <Button className="bg-white text-green-700 hover:bg-gray-100">Power Up 1</Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100">Power Up 2</Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100">Power Up 3</Button>
            </CardContent>
          </Card>
        </CardContent>
      </motion.main>

      {/* Chat section */}
      <aside
        className="w-full md:w-1/4 h-full bg-[rgba(255, 255, 255, 0.2)]  backdrop-blur-lg"
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
