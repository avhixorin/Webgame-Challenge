import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer as TimerIcon, X } from "lucide-react";
import { Difficulty } from "@/types/types";
import { useNavigate } from "react-router-dom";

type TimerProps = {
  difficulty: Difficulty;
};

const Timer: React.FC<TimerProps> = ({ difficulty }) => {
  const [time, setTime] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [penaltyActive, setPenaltyActive] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    switch (difficulty) {
      case Difficulty.EASY:
        setTime(5 * 60);
        break;
      case Difficulty.MEDIUM:
        setTime(3.5 * 60);
        break;
      case Difficulty.HARD:
        setTime(2 * 60);
        break;
      case Difficulty.GOD:
        setTime(40);
        break;
    }
    setTimerActive(true);
    setGameOver(false);
    setShowRanking(false);
  }, [difficulty]);

  useEffect(() => {
    if (time <= 0 && timerActive) {
      setGameOver(true);
      setTimerActive(false);
      return;
    }

    const timerId = timerActive && setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    return () => clearInterval(timerId);
  }, [time, timerActive]);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setGameOver(false);
        setShowRanking(true);
      }, 2000);
    }
  }, [gameOver]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const navigate = useNavigate();
  const handleNewGame = () => {
    setTime(difficulty === Difficulty.EASY ? 5 * 60 : difficulty === Difficulty.MEDIUM ? 3.5 * 60 : difficulty === Difficulty.HARD ? 2 * 60 : 40);
    setShowRanking(false);
    setTimerActive(true);
    navigate("/pg2");
  };

  const applyPenalty = () => {
    setTime((prev) => Math.max(prev - 15, 0));
    setPenaltyActive(true);
    setTimeout(() => setPenaltyActive(false), 500);
  };

  const applyPowerUp = () => {
    setTime((prev) => prev + 15);
  };

  const timerColor = () => {
    const percentage = (time / (difficulty === Difficulty.EASY ? 300 : difficulty === Difficulty.MEDIUM ? 210 : difficulty === Difficulty.HARD ? 120 : 40)) * 100;
    if (percentage <= 20) return "bg-red-500";
    if (percentage <= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className={`relative flex items-center gap-2 ${penaltyActive ? "bg-red-700 scale-110" : timerColor()} transition-all duration-500 p-3 rounded-lg shadow-lg`}>
      <TimerIcon size={32} stroke="#fff" />
      <span className="text-2xl font-semibold tracking-wide">{formatTime(time)}</span>

      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white/20 backdrop-blur-md text-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold">Game Over</h2>
              <p className="text-lg mt-2">Time's up!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRanking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white/20 backdrop-blur-md text-white p-6 rounded-lg shadow-lg text-center relative">
              <button
                onClick={() => setShowRanking(false)}
                className="absolute top-2 right-2 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold">Top Players</h2>
              <div className="mt-4">
                <p className="text-lg">1st: PlayerOne</p>
                <p className="text-lg">2nd: PlayerTwo</p>
                <p className="text-lg">3rd: PlayerThree</p>
              </div>
              <button
                onClick={handleNewGame}
                className="mt-6 px-4 py-2 bg-green-600 rounded-lg font-semibold text-white hover:bg-green-500"
              >
                Start New Game
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timer;
