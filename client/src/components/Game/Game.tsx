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
  addScore,
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
import { Filter } from "bad-words";
import FriendsSection from "./FriendsSection/FriendsSection";


const Game: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  useWords();
  const filter = new Filter();
  const gameString = useSelector((state: RootState) =>
    state.userGameData.currentGameString.toUpperCase().split("")
  );

  const [inputWord, setInputWord] = useState<string>("");
  const [numPlayers, setNumPlayers] = useState<number>(1);
  const [difficulty, setLocalDifficulty] = useState<DIFFICULTY>(
    DIFFICULTY.EASY
  );
  const [backGround,setBackground] = useState<string>("bg-green-400")

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
    if (filter.isProfane(inputWord)) {
      toast({
        title: "🚫 Offensive Word Detected!",
        description: "Please refrain from using inappropriate language.",
        className: "bg-red-500 rounded-md text-white",
        color: "white"
      });
      dispatch(addScore(-3))
      return; 
    }
    const isValid = await validate();
    if (isValid) {
      const finalScore = getScore(inputWord.toLowerCase());
      toast({
        title: "🎉 Hooray! You did it! 🎉",
        description: `That's a valid word! You just scored a sweet +${finalScore} points! 🥳`,
        className:
          "bg-white/25 rounded-md border border-white/20 backdrop-blur-lg text-white",
          color: "white"
      });

      setInputWord("");
    } else {
      getNegativeScore(gameString.join(""), inputWord);
    }
  };
  
  const handlePowerUpClick = (power: number) => {
    if (power === 1) {
      setBackground("bg-power1");
    } else if (power === 2) {
      setBackground("bg-power2 bg-center object-contain");
    } else if (power === 3) {
      setBackground("bg-power3");
    }
  
    // Reset the background to green after 2 seconds
    setTimeout(() => {
      setBackground("bg-green-400");
    }, 4000);
  };
  
  const friends = [
    {
      avatar: "https://randomuser.me/api/portraits/thumb/women/71.jpg",
      username: "GalaxyWarrior",
      score: 1240,
    },
    {
      avatar: "https://randomuser.me/api/portraits/thumb/women/75.jpg",
      username: "StarShooter",
      score: 980,
    },
    {
      avatar: "https://randomuser.me/api/portraits/thumb/women/77.jpg",
      username: "LunarLad",
      score: 1150,
    },
  ];
  

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
        <motion.div
          className="w-full py-4 flex justify-center items-center flex-wrap gap-4"
          variants={containerVariants}
        >
          {gameString.map((letter: string, index: number) => (
            <AlphaContainer key={index} alphabet={letter} />
          ))}
        </motion.div>
        <Card className="w-full flex-wrap bg-transparent flex justify-center items-center py-4 border-none shadow-none">
          <p>Guessed Words Section</p>
        </Card>
        {/* Input Section */}
        <Card className="w-full flex flex-col md:flex-row bg-transparent gap-4 justify-between items-center border-none shadow-none">
          <Card className="w-full">
            <CardHeader>Scores:</CardHeader>
            {
              friends.map((friend,index) => (
                <FriendsSection key={index} friend={friend} />
              ))
            }
          </Card>
          <Card className="w-full">
            <p>My score Section</p>
          </Card>
          <Card className="w-full">
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
          
        </Card>

        {/* PowerUps Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div>

          </div>
          <CardContent className="p-4">
          <Card className={`
          ${backGround}
          bg-
           rounded-md shadow-md
          transition-all
          `} style={{"transitionDuration": "0.2s",backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",}} >
            <CardHeader>
              <CardTitle className="
              text-white text-lg sm:text-xl md:text-2xl">
                PowerUps Section
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4 p-4">
              <Button className="bg-white text-green-700 hover:bg-gray-100"
              onClick={() => handlePowerUpClick(1)}
              >
                Power Up 1
              </Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100"
              onClick={() => handlePowerUpClick(2)}
              >
                Power Up 2
              </Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100"
              onClick={() => handlePowerUpClick(3)}
              >
                Power Up 3
              </Button>
            </CardContent>
          </Card>
        </CardContent>
        </div>
        

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
