import React, { useEffect } from "react";
import "../../index.css"
import { motion } from "framer-motion";
import { GameBg } from "../GameBg/GameBg";
import AlphabetSection from "./AlphabetSection/Alphabets";
import GuessedWords from "./GuessedWords/GuessedWords";
import InputSection from "./InputSection/Input";
import PowerUpSection from "./PowerUpSection/PowerUp";
import ChatSection from "./ChatSection/Chats";
import Profile from "./Profile/Profile";
import { Bento } from "./Bento";
import { Card } from "../ui/card";
import FriendsScore from "./FriendsScoreSection/FriendsScore";

const Game: React.FC = () => {
  useEffect(() => {
    const enterFullScreen = () => {
      document.documentElement.requestFullscreen();
    };

    const exitFullScreen = () => {
      document.exitFullscreen();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
      if (document.fullscreenElement) {
        exitFullScreen();
      } else {
        enterFullScreen();
      }
      }
    };

    enterFullScreen();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
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
    <div className="relative w-full p-4 h-full">
      <GameBg  />
      <motion.main
        className="w-full h-full  grid grid-cols-4 gap-4"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="col-span-2 p-6 shadow-lg rounded-xl bg-white/10  backdrop-blur-lg">
         <AlphabetSection />
         </Card>
        <Card className="col-span-2 row-span-1 p-6 bg-white shadow-lg rounded-xl relative overflow-hidden">
          
        <InputSection />
      </Card>
      <Card className="p-4 bg-white shadow-lg rounded-xl">
      <FriendsScore />
    </Card>
    <Card className="p-4 bg-gray-900 text-white shadow-lg rounded-xl flex items-center justify-center">
          <GuessedWords />
        </Card>
    <Card className="col-span-1 row-span-1 p-6 bg-white shadow-lg rounded-xl relative overflow-hidden">
          
          <PowerUpSection />
        </Card>
    <Card className="col-span-1 row-span-1 p-6 bg-white shadow-lg rounded-xl relative overflow-hidden">
          
          <ChatSection />
        </Card>
      </motion.main>

    </div>
    // <Bento />
    
  );
};

export default Game;
