'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const useBackgroundAnimation = () => {
  const [shapes, setShapes] = useState<Shape[]>([])

  const createShape = useCallback(() => {
    return {
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 10,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }
  }, [])

  useEffect(() => {
    const initialShapes = Array(10).fill(null).map(createShape)
    setShapes(initialShapes)

    const interval = setInterval(() => {
      setShapes(prevShapes => [...prevShapes.slice(1), createShape()])
    }, 2000)

    return () => clearInterval(interval)
  }, [createShape])

  return shapes
}

export default function Home() {
  const [isEntering, setIsEntering] = useState(false)
  const shapes = useBackgroundAnimation()
  const navigate = useNavigate();

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
        navigate("/pg1")
      console.log('Entering game...')
    }, 1500)
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-30"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-20%', '20%', '-20%'],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
          }}
        />
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-4">
        <motion.h1
          className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Word Battle Royale!
        </motion.h1>
        <motion.button
          className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnterGame}
        >
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
  )
}