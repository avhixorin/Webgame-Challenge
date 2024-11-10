import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Difficulty } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { setDifficulty } from "@/Redux/features/sharedGameDataSlice";
import useSocket from "@/hooks/connectSocket";
import { RootState } from "@/Redux/store/store";
import { Button } from "../ui/button";

const SelectionPage: React.FC = () => {
  const [difficulty, setLocalDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const { startGame } = useSocket();
  const { roomId } = useSelector((state: RootState) => state.room);
  const gameData = useSelector((state: RootState) => state.sharedGameData);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setDifficulty(difficulty));
    startGame(roomId,gameData)
    console.log("Starting game with difficulty: ", difficulty);
  };
  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden bg-game-bg bg-center bg-cover bg-no-repeat text-zinc-700">
      <Card className="px-6 bg-opacity-80 shadow-lg backdrop-blur-md rounded-lg">
        <CardHeader>
          <h1 className="text-3xl text-center font-bold  mb-4">
            Select Game Difficulty
          </h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="w-full max-w-sm">
              <Select onValueChange={(value) => setLocalDifficulty(value as Difficulty)}>
                <SelectTrigger className="w-full bg-slate-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Difficulty.EASY} className="cursor-pointer font-bold">
                    Easy
                  </SelectItem>
                  <SelectItem value={Difficulty.MEDIUM} className="cursor-pointer font-bold">
                    Medium
                  </SelectItem>
                  <SelectItem value={Difficulty.HARD} className="cursor-pointer font-bold">
                    Hard
                  </SelectItem>
                  <SelectItem value={Difficulty.GOD} className="cursor-pointer font-bold">
                    God
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
              <Button onClick={handleClick} className="w-full bg-indigo-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">Start Game</Button>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectionPage;
