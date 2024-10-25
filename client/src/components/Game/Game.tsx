import React from "react";
import { motion } from "framer-motion";
import { GameBg } from "../GameBg/GameBg";
import AlphabetSection from "./AlphabetSection/AlphabetSection";
import GuessedWords from "./GuessedWords/GuessedWords";
import InputSection from "./InputSection/InputSection";
import PowerUpSection from "./PowerUpSection/PowerUpSection";
import ChatSection from "./Chats/ChatSection";
import Profile from "./Profile/Profile";


const Game: React.FC = () => {
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
    <div className="relative w-full p-4 h-full flex flex-col md:flex-row gap-4">
      <GameBg />
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
        <AlphabetSection />
        <GuessedWords />
        {/* Input Section */}
        <InputSection />
        {/* PowerUps Section */}
        <PowerUpSection />
        {/* Difficulty and Players Input */}
        <Profile />
      </motion.main>
        <ChatSection />
      
    </div>
  
  );
};

export default Game;
