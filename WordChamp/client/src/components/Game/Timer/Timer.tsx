import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer as TimerIcon, X } from "lucide-react";
import { Difficulty } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";



const Timer: React.FC = () => {
  const { difficulty } = useSelector((state: RootState) => state.sharedGameData);
  const [timer, setTimer] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [penaltyActive, setPenaltyActive] = useState(false);

  // Format the timer into mm:ss format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Determine the timer color based on remaining time


  // Get maximum time based on difficulty
  const getMaxTimeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.EASY:
        setTimer(5 * 60) ; 
        break;
      case Difficulty.MEDIUM:
        setTimer(3.5 * 60)
        break;
      case Difficulty.HARD:
        setTimer(2 * 60)
        break;
      case Difficulty.GOD:
        setTimer(40)
        break;
      default:
        return 5 * 60; 
    }
  };

  const timerColor = () => {
    const maxTime = timer;
    const percentage = (timer / maxTime) * 100;
    if (percentage <= 20) return "bg-red-500";
    if (percentage <= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Handle game over state
  useEffect(() => {
    if (timer <= 0) {
      setGameOver(true);
    }
  }, [timer]);

  // Handle ranking visibility toggle
  const toggleRanking = () => setShowRanking((prev) => !prev);

  // Handle new game action
  const handleNewGame = () => {
    setShowRanking(false);
    // Trigger new game logic here (e.g., reset timer)
  };

  return (
    <div
      className={`relative flex items-center gap-2 ${penaltyActive ? "bg-red-700 scale-110" : timerColor()} transition-all duration-500 p-3 rounded-lg shadow-lg`}
    >
      <TimerIcon size={32} stroke="#fff" />
      <span className="text-2xl font-semibold tracking-wide">{formatTime(timer)}</span>
    </div>
  );
};

export default Timer;
