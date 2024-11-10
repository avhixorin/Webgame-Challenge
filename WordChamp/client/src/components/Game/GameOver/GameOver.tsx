import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import LeaderBoard from '../LeaderBoard/LeaderBoard';

const GameOver: React.FC<{ gameOver: boolean, showRanking: boolean, toggleRanking: () => void, handleNewGame: () => void }> = ({ gameOver, toggleRanking, handleNewGame }) => {
    const [showRanking, setShowRanking] = useState(false);
    if(gameOver){
        setShowRanking(true);
    }
  return (
    <div>
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-[#0A0E1A]/90 text-[#00FFFF] p-8 rounded-lg shadow-xl border border-[#1E90FF] backdrop-blur-lg text-center">
              <h2 className="text-4xl font-bold text-[#00FFFF]">Game Over</h2>
              <p className="text-xl mt-4 text-slate-300">Time's up!</p>
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
            <div className="bg-[#0A0E1A]/90 p-6 rounded-lg shadow-lg border border-[#1E90FF] text-[#00FFFF] backdrop-blur-lg text-center relative">
              <button
                onClick={toggleRanking}
                className="absolute top-2 right-2 text-[#00FFFF] hover:text-[#1E90FF]"
              >
                <X size={24} />
              </button>
              <LeaderBoard />
              <button
                onClick={handleNewGame}
                className="mt-6 px-6 py-2 bg-[#1E90FF] rounded-lg font-semibold text-slate-200 hover:bg-[#00FFFF] hover:text-slate-900 transition"
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

export default GameOver;
