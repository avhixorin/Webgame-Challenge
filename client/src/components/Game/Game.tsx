import React, { useState } from "react";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { GameBg } from "../GameBg/GameBg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DIFFICULTY,
  setDifficulty,
  setParticipants,
  setScore,
} from "@/Redux/features/userGameDataSlice";
import { useDispatch } from "react-redux";

import { setWordCount, setWordsFetched } from "@/Redux/features/wordsData";
import AlphabetSection from "./AlphabetSection/AlphabetSection";
import GuessedWords from "./GuessedWords/GuessedWords";
import InputSection from "./InputSection/InputSection";
import PowerUpSection from "./PowerUpSection/PowerUpSection";
import ChatSection from "./Chats/ChatSection";


const Game: React.FC = () => {
  const dispatch = useDispatch();

  const [numPlayers, setNumPlayers] = useState<number>(1);
  const [difficulty, setLocalDifficulty] = useState<DIFFICULTY>(
    DIFFICULTY.EASY
  );


  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value));
    setNumPlayers(value);
    dispatch(setParticipants(value));
  };

  const handleSelectDifficulty = (value: DIFFICULTY) => {
    setLocalDifficulty(value);
    dispatch(setDifficulty(value));
    const wordCount =
      value === DIFFICULTY.GOD
        ? 1
        : value === DIFFICULTY.HARD || value === DIFFICULTY.MEDIUM
        ? 3
        : 5;
    dispatch(setWordCount(wordCount));
    dispatch(setWordsFetched(false));
    dispatch(setScore(0));
  };
 
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
        <div className="w-full py-4 flex justify-evenly items-center gap-4">
          <Select onValueChange={handleSelectDifficulty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={difficulty} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DIFFICULTY.EASY}>Easy</SelectItem>
              <SelectItem value={DIFFICULTY.MEDIUM}>Medium</SelectItem>
              <SelectItem value={DIFFICULTY.HARD}>Hard</SelectItem>
              <SelectItem value={DIFFICULTY.GOD}>God</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            min="1"
            placeholder="Enter number of players"
            className="flex-1 text-gray-900"
            value={numPlayers}
            onChange={handlePlayerChange}
          />
        </div>
      </motion.main>
        <ChatSection />
      
    </div>
  
  );
};

export default Game;
