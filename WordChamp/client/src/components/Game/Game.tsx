import React, { useEffect, useState } from "react";
import "../../index.css";
import AlphabetSection from "./AlphabetSection/Alphabets";
import InputSection from "./InputSection/Input";
import GuessedWords from "./GuessedWords/GuessedWords";
import useSound from "@/hooks/useSound";
import { Axe, ScrollText, Shield, Volume, VolumeX, X } from "lucide-react";
import ScoreCard from "../ScoreCard/ScoreCard";
import ChatSection from "./ChatSection/Chats";
import { rulesContent } from "@/constants/Rules";
import { motion } from "framer-motion";
import Timer from "./Timer/Timer";
import { Difficulty } from "@/types/types";

const Game: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [powerUpVisible, setPowerUpVisible] = useState(false);

  const { playBackgroundMusic, stopBackgroundMusic } = useSound();

  // Toggle fullscreen
  useEffect(() => {
    const enterFullScreen = () => document.documentElement.requestFullscreen();
    const exitFullScreen = () => document.exitFullscreen();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (document.fullscreenElement) exitFullScreen();
        else enterFullScreen();
      }
    };

    enterFullScreen();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Toggle mute
  const handleMuteToggle = () => {
    setMuted((prev) => !prev);
    if (muted) {
      stopBackgroundMusic();
    } else {
      playBackgroundMusic("./sounds/background1.mp3");
    }
  };

  // Toggle Power-Up Menu
  const togglePowerUpMenu = () => {
    setPowerUpVisible((prev) => !prev);
  };

  return (
    <div className="relative flex justify-around items-center bg-game-bg1 bg-center bg-cover w-full p-4 h-full gap-2">
      {/* Left Sidebar */}
      <aside className="w-full max-w-80 h-full py-6 rounded-lg flex flex-col justify-center items-end">
        <div className="absolute top-10 left-10 z-10">
          <button onClick={handleMuteToggle} aria-label="Toggle Mute">
            {muted ? <VolumeX size={32} stroke="#27272a" /> : <Volume size={32} stroke="#27272a" />}
          </button>
        </div>
        <ScoreCard />
      </aside>

      {/* Main Game Section */}
      <div className="w-full h-full flex flex-col justify-around items-center">
        <AlphabetSection />
        <GuessedWords />
        <InputSection />
      </div>

      {/* Right Sidebar */}
      <aside className="max-w-96 w-full h-full py-6 rounded-lg flex flex-col justify-between items-center">
        <div className="w-full flex flex-col items-end gap-4">
          {/* Rules Section */}
          {!open ? (
            <button onClick={() => setOpen(true)} aria-label="Show Rules">
              <ScrollText size={32} className="text-white" />
            </button>
          ) : (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
              <div className="bg-[url('/placeholder.svg?height=600&width=400')] bg-cover bg-center w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl overflow-hidden relative animate-unfurl">
                <div className="absolute inset-0 bg-stone-100 bg-opacity-90"></div>
                <div className="relative h-full flex flex-col p-6 overflow-hidden custom-scrollbar">
                  <h2 className="text-3xl font-bold mb-4 text-center text-amber-800 drop-shadow-md">WordChamp Rules</h2>
                  <div className="flex-grow overflow-y-auto custom-scrollbar">
                    {rulesContent.map((rule, index) => (
                      <div key={index} className="mb-6">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-amber-700">
                          {rule.icon}
                          {rule.title}
                        </h3>
                        <p className="text-lg leading-relaxed">{rule.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end items-center">
                    <button onClick={() => setOpen(false)} className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Power-Up Section */}
          <div
            onClick={togglePowerUpMenu}
            className="relative transition-transform transform hover:scale-110 duration-300 cursor-pointer"
          >
            <img src="./images/thunder.svg" width={32} height={32} alt="PowerUp Icon" />
          </div>

          {/* Power-Up Menu with Framer Motion */}
          {powerUpVisible && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.2,
              }}
              className="absolute top-16 right-14 bg-transparent px-2 rounded-lg flex flex-col gap-4"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 15,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <Timer size={30} stroke="#000" fill="#fff" className="cursor-pointer" />
              </motion.div>
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.1 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 15,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <Shield size={30} stroke="#000" fill="#fff" className="cursor-pointer" />
              </motion.div>
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.2 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 15,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <Axe size={30} stroke="#000" fill="#fff" className="cursor-pointer" />
              </motion.div>
            </motion.div>
          )}
        </div>
          <Timer difficulty={Difficulty.EASY} />
        <ChatSection />
      </aside>
    </div>
  );
};

export default Game;
