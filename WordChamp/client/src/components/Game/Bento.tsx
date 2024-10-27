import React, { useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { GameBg } from '../GameBg/GameBg'
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store/store';
import { Button } from '../ui/button';
import useTheme from '@/hooks/useTheme';
import { THEME } from '@/Redux/features/userSlice';

export const Bento: React.FC = () => {
  const [bgColorStart, setBgColorStart] = React.useState("rgb(108, 0, 162)");
  const [bgColorEnd, setBgColorEnd] = React.useState("rgb(0, 17, 82)");
  const theme = useSelector((state: RootState) => state.user.user?.theme);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    setBgColorStart(theme === THEME.DARK ? "black" : "rgb(0, 17, 82)");
    setBgColorEnd(theme === THEME.DARK ? "black" : "rgb(108, 0, 162)");
  }, [theme]);

  const handleClick = () => {
    toggleTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="relative w-full p-4 h-full">
      <GameBg gradientBackgroundStart={bgColorStart} gradientBackgroundEnd={bgColorEnd} />
      <motion.main
        className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={cardVariants} className="col-span-2 row-span-2">
          <Card className="h-full p-6 shadow-lg rounded-xl bg-white/10 backdrop-blur-lg border-none hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white font-bold text-xl">
            <Button className="dark:text-white" onClick={handleClick}>
              Toggle Theme
            </Button>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="h-full p-6 shadow-lg rounded-xl bg-white/10 backdrop-blur-lg border-none hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white font-bold text-xl">
            Section 2
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="h-full p-6 shadow-lg rounded-xl bg-white/10 backdrop-blur-lg border-none hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white font-bold text-xl">
            Section 3
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="h-full p-6 shadow-lg rounded-xl bg-white/10 backdrop-blur-lg border-none hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white font-bold text-xl">
            Section 4
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="h-full p-6 shadow-lg rounded-xl bg-white/10 backdrop-blur-lg border-none hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white font-bold text-xl">
            Section 5
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants} className="col-span-2">
          <Card className="h-full p-6 shadow-lg rounded-xl bg-white/10 backdrop-blur-lg border-none hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white font-bold text-xl">
            Section 6
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="h-full p-6 shadow-lg rounded-xl bg-white/10 backdrop-blur-lg border-none hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white font-bold text-xl">
            Section 7
          </Card>
        </motion.div>
      </motion.main>
    </div>
  );
}
