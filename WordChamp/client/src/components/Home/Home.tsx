'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Alphabets from './floatingAlphabets/Alphabets';

interface AlphabetShape {
  id: number;
  x: number;
  y: number;
  angle: number;
  duration: number;
  alphabet: string;
}

const useBackgroundAnimation = () => {
  const [shapes, setShapes] = useState<AlphabetShape[]>([]);
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const createShape = useCallback(() => {
    return {
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      angle: Math.random() * 45 - 22.5, 
      duration: Math.random() * 10 + 5,
      alphabet: alphabets[Math.floor(Math.random() * alphabets.length)],
    };
  }, [alphabets]);

  useEffect(() => {
    const initialShapes = Array(9).fill(null).map(createShape); // 12 shapes to fill the screen
    setShapes(initialShapes);
  }, [createShape]);

  return shapes;
};

export default function Home() {
  const shapes = useBackgroundAnimation();
  const navigate = useNavigate();

  const handleEnterGame = () => {
    setTimeout(() => {
      navigate('/pg1');
    }, 1500);
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden bg-game-bg bg-center bg-cover">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `rotate(${shape.angle}deg)`,
          }}
          animate={{
            y: ['-10%', '10%', '-10%'], 
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Alphabets alphabet={shape.alphabet} />
        </motion.div>
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-4">
        <motion.h1
          className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 md:text-6xl lg:text-7xl"
        >
          Welcome to Word Battle Royale!
        </motion.h1>
        <motion.button
          className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnterGame}
        >
          Enter Game
        </motion.button>
      </div>
    </div>
  );
}
