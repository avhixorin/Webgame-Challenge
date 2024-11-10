import React, { useEffect, useState } from "react";
import "../../index.css";
import AlphabetSection from "./AlphabetSection/Alphabets";
import InputSection from "./InputSection/Input";
import GuessedWords from "./GuessedWords/GuessedWords";
import useSound from "@/hooks/useSound";
import { Axe, ScrollText, Shield, Timer, TimerIcon, Volume, VolumeX, X } from "lucide-react";
import ScoreCard from "../ScoreCard/ScoreCard";
import ChatSection from "./ChatSection/Chats";
import { rulesContent } from "@/constants/Rules";
import { motion } from "framer-motion";
import Profile from "./Profile/Profile";
import { Difficulty } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";
import GameOver from "./GameOver/GameOver";
import { useNavigate } from "react-router-dom";

const Game: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [powerUpVisible, setPowerUpVisible] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const { playBackgroundMusic, stopBackgroundMusic } = useSound();
  const { difficulty } = useSelector((state: RootState) => state.sharedGameData);

  useEffect(() => {
    enableFullScreenOnKeyPress();
    return () => disableFullScreenOnKeyPress();
  }, []);

  // Set initial timer based on difficulty and start countdown
  useEffect(() => {
    setTimer(getMaxTimeForDifficulty(difficulty));
    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [difficulty]);

  useEffect(() => {
    if (timer <= 0) {
      handleGameOver();
    }
  }, [timer]);

  const handleMuteToggle = () => {
    setMuted((prev) => !prev);
    if (muted) {
      stopBackgroundMusic();
    } else {
      playBackgroundMusic("./sounds/background1.mp3");
    }
  };

  const togglePowerUpMenu = () => setPowerUpVisible((prev) => !prev);

  const handleGameOver = () => {
    setGameOver(true);
    console.log("Game over!");
  };
  const navigate = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const handleNewGame = () => {
    navigate("/")
  };
  return (
    <div className="relative flex justify-around items-center bg-game-bg1 bg-center bg-cover w-full p-4 h-full gap-2">
      {/* <GameOver gameOver={gameOver} handleNewGame={handleNewGame} /> */}
      {/* Left Sidebar */}
      <SidebarLeft handleMuteToggle={handleMuteToggle} muted={muted} />

      {/* Main Game Section */}
      <MainGameSection />

      {/* Right Sidebar */}
      <SidebarRight
        open={open}
        setOpen={setOpen}
        powerUpVisible={powerUpVisible}
        togglePowerUpMenu={togglePowerUpMenu}
        timer={timer}
        timerColor={timerColor(timer)}
      />
    </div>
  );
};

export default Game;

// Helper Functions and Utility Components

function enableFullScreenOnKeyPress() {
  const enterFullScreen = () => document.documentElement.requestFullscreen();
  const exitFullScreen = () => document.exitFullscreen();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "F") {
      if (document.fullscreenElement) {
        exitFullScreen();
      } else {
        enterFullScreen();
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
}

function disableFullScreenOnKeyPress() {
  window.removeEventListener("keydown", enableFullScreenOnKeyPress);
}

const getMaxTimeForDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return 5 * 60;
    case Difficulty.MEDIUM:
      return 3.5 * 60;
    case Difficulty.HARD:
      return 2 * 60;
    case Difficulty.GOD:
      return 40;
    default:
      return 5 * 60;
  }
};

const SidebarLeft = ({ handleMuteToggle, muted }: { handleMuteToggle: () => void; muted: boolean }) => (
  <aside className="w-full max-w-80 h-full py-6 rounded-lg flex flex-col justify-between items-center">
    <div className="absolute top-10 left-10 z-10">
      <button onClick={handleMuteToggle} aria-label="Toggle Mute">
        {muted ? <VolumeX size={32} stroke="#27272a" /> : <Volume size={32} stroke="#27272a" />}
      </button>
    </div>
    <ScoreCard />
    <Profile />
  </aside>
);

const MainGameSection = () => (
  <div className="w-full h-full flex flex-col justify-around items-center">
    <AlphabetSection />
    <GuessedWords />
    <InputSection />
  </div>
);

const SidebarRight = ({
  open,
  setOpen,
  powerUpVisible,
  togglePowerUpMenu,
  timer,
  timerColor,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  powerUpVisible: boolean;
  togglePowerUpMenu: () => void;
  timer: number;
  timerColor: string;
}) => (
  <aside className="max-w-96 w-full h-full py-6 rounded-lg flex flex-col justify-between items-center">
    <RulesSection open={open} setOpen={setOpen} />
    <PowerUpSection powerUpVisible={powerUpVisible} togglePowerUpMenu={togglePowerUpMenu} />
    <TimerDisplay timer={timer} timerColor={timerColor} />
    <ChatSection />
  </aside>
);

const RulesSection = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => (
  <div className="w-full flex flex-col items-end gap-4">
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
            <button onClick={() => setOpen(false)} className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

const PowerUpSection = ({ powerUpVisible, togglePowerUpMenu }: { powerUpVisible: boolean; togglePowerUpMenu: () => void }) => (
  <div className="relative transition-transform transform hover:scale-110 duration-300 cursor-pointer">
    <img src="./images/thunder.svg" width={32} height={32} alt="PowerUp Icon" onClick={togglePowerUpMenu} />
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
        {[Timer, Shield, Axe].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ type: "spring", stiffness: 100, damping: 25, delay: index * 0.1 }}
            whileHover={{
              scale: 1.1,
              rotate: 15,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
          >
            <Icon size={30} stroke="#000" fill="#fff" className="cursor-pointer" />
          </motion.div>
        ))}
      </motion.div>
    )}
  </div>
);

const TimerDisplay = ({ timer, timerColor }: { timer: number; timerColor: string }) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  return(
    <div className={`relative flex items-center gap-2 ${timerColor} transition-all duration-500 p-3 rounded-lg shadow-lg`}>
      <TimerIcon size={28} stroke="#4b5563" />
      <span className="text-2xl font-semibold tracking-wide">{formatTime(timer)}</span>
    </div>
  );
}
  
  

const timerColor = (timer: number) => {
  return timer <= 10 ? "bg-red-500" : timer <= 30 ? "bg-amber-500" : "bg-emerald-500";
};
