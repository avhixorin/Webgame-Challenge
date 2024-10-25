import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "@/hooks/use-toast";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
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
import useWords from "@/hooks/getAllWords";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";
import AlphaContainer from "./AlphaContainer/AlphaContainer";
import { setWordCount, setWordsFetched } from "@/Redux/features/wordsData";
import useValidate from "@/hooks/validateWord";
import useComplexity from "@/hooks/checkComplexity";
import useMistake from "@/hooks/checkNegatives";

const Game: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  useWords();

  // Make sure the casing matches your actual Redux state slice
  const gameString = useSelector((state: RootState) =>
    state.userGameData.currentGameString.toUpperCase().split("")
  );

  const [inputWord, setInputWord] = useState<string>("");
  const [numPlayers, setNumPlayers] = useState<number>(1);
  const [difficulty, setLocalDifficulty] = useState<DIFFICULTY>(
    DIFFICULTY.EASY
  );

  const validate = useValidate(inputWord.toLowerCase());
  const { getScore } = useComplexity();
  const { getNegativeScore } = useMistake();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(e.target.value);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      const finalScore = getScore(inputWord.toLowerCase());
      toast({
        title: "🎉 Hooray! You did it! 🎉",
        description: `That's a valid word! You just scored a sweet +${finalScore} points! 🥳`,
        className:
          "bg-white/25 rounded-md border border-white/20 backdrop-blur-lg text-white",
      });

      setInputWord("");
    } else {
      getNegativeScore(gameString.join(""), inputWord);
    }
  };

  return (
    <div className="relative w-full p-4 h-screen flex flex-col md:flex-row gap-4">
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
        <motion.div
          className="w-full py-4 flex justify-center items-center flex-wrap gap-4"
          variants={containerVariants}
        >
          {gameString.map((letter: string, index: number) => (
            <AlphaContainer key={index} alphabet={letter} />
          ))}
        </motion.div>

        {/* Input Section */}
        <Card className="w-full bg-transparent border-none px-20">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-white">
              Input Section
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="flex space-x-2 mt-2">
              <Input
                type="text"
                placeholder="Enter something..."
                className="flex-1 text-gray-900"
                value={inputWord.toUpperCase()}
                onChange={handleInputChange}
              />
              <Button type="submit" className="text-white">
                Enter
              </Button>
            </CardContent>
          </form>
        </Card>

        {/* PowerUps Section */}
        <CardContent className="p-4">
          <Card className="bg-green-500 rounded-md shadow-md">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl md:text-2xl">
                PowerUps Section
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4 p-4">
              <Button className="bg-white text-green-700 hover:bg-gray-100">
                Power Up 1
              </Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100">
                Power Up 2
              </Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100">
                Power Up 3
              </Button>
            </CardContent>
          </Card>
        </CardContent>

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

      {/* Chat section */}
      <aside
        className="w-full md:w-1/4 h-full bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-lg"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Card className="h-full flex flex-col bg-transparent">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-2"></ScrollArea>
            <Separator />
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};

export default Game;
