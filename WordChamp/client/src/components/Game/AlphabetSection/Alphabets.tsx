import React from "react";
import { motion } from "framer-motion";
import AlphaContainer from "./AlphaContainer/AlphaContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";

const AlphabetSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
      },
    },
  };

  const gameString = useSelector((state: RootState) =>
    state.sharedGameData.currentGameString.toUpperCase().split("")
  );

  return (
    <motion.div
      className="w-full py-4 flex justify-center items-center flex-wrap gap-4"
      variants={containerVariants}
      initial="hidden" 
      animate="visible"
    >
      {gameString.map((letter: string, index: number) => (
        <AlphaContainer key={index} alphabet={letter} />
      ))}
    </motion.div>
  );
};

export default AlphabetSection;
