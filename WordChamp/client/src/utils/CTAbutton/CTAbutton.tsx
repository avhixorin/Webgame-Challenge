import { motion } from 'framer-motion';
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function CTAButton({ label, onClick }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="relative overflow-hidden rounded-full px-5 py-2 font-bold text-white shadow-lg transition-all duration-300 ease-out"
      style={{
        background: 'linear-gradient(45deg, #4CAF50 0%, #81C784 50%, #A5D6A7 100%)',
        boxShadow: isHovered
          ? '0 10px 20px rgba(0,128,0,0.2), 0 6px 6px rgba(0,128,0,0.2), inset 0 -5px 10px rgba(0,128,0,0.1)'
          : '0 5px 15px rgba(0,128,0,0.1), 0 3px 3px rgba(0,128,0,0.1), inset 0 -2px 5px rgba(0,128,0,0.1)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative z-10 text-xl tracking-wide">{label}</span>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
          opacity: isHovered ? 0.8 : 0.5,
        }}
        animate={{ rotate: isHovered ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
