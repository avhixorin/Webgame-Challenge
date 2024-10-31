"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Alphabets from "./floatingAlphabets/Alphabets";

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
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
    const initialShapes = Array(9).fill(null).map(createShape);
    setShapes(initialShapes);
  }, [createShape]);

  return shapes;
};

export default function Home() {
  const shapes = useBackgroundAnimation();
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false)
  const playSound = () => {
    const audioContext = new (window.AudioContext || window.AudioContext)()
    const oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5)
    
    const gainNode = audioContext.createGain()
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.5)
  }
  const handleEnterGame = () => {
    setIsEntering(true)
    playSound()
    setTimeout(() => {
      navigate("/pg1");
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
            y: ["-10%", "10%", "-10%"],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Alphabets alphabet={shape.alphabet} />
        </motion.div>
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-4">
        <motion.img
          src="./images/title.png"
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 7,
            duration: 0.5,
          }}
          onAnimationComplete={() => {
            document
              .querySelector("img.w-[32rem]")
              ?.setAttribute("style", "transform: scale(1);");
          }}
          className="w-[32rem]"
        />

        <motion.button
          className="relative px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg 
    transition-transform duration-300 ease-out overflow-hidden"
          whileHover={{
            scale: 1.08, 
          }}
          whileTap={{
            scale: 0.95, 
          }}
          onClick={handleEnterGame}
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-25 rounded-full blur-md -z-10 hover:backdrop-blur-lg hover:bg-transparent hover:text-white"></span>
          Enter Game
        </motion.button>
      </div>
      <AnimatePresence>
        {isEntering && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="w-0 h-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              animate={{
                width: '200vmax',
                height: '200vmax',
                transition: { duration: 1.5, ease: 'easeInOut' },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
