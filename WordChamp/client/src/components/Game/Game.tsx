import React, { useEffect, useState } from "react";
import "../../index.css";
import AlphabetSection from "./AlphabetSection/Alphabets";
import InputSection from "./InputSection/Input";
import GuessedWords from "./GuessedWords/GuessedWords";
import useSound from "@/hooks/useSound";
import { Volume, VolumeX } from "lucide-react";
import Rules from "./Rules/Rules";
import ScoreCard from "../ScoreCard/ScoreCard";

const Game: React.FC = () => {
  useEffect(() => {
    const enterFullScreen = () => {
      document.documentElement.requestFullscreen();
    };

    const exitFullScreen = () => {
      document.exitFullscreen();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (document.fullscreenElement) {
          exitFullScreen();
        } else {
          enterFullScreen();
        }
      }
    };

    enterFullScreen();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  
  const { playBackgroundMusic, stopBackgroundMusic } = useSound();
  const [muted, setMuted] = useState(false);

  return (
    <div className="relative flex justify-around items-center bg-game-bg1 bg-center bg-cover w-full p-4 h-full gap-2">
      {/* Left Sidebar */}
      <aside className="max-w-96 h-full  py-6 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="absolute top-10 left-10 z-10">
          {muted ? (
            <button
              onClick={() => {
                setMuted(false);
                playBackgroundMusic("./sounds/background1.mp3");
              }}
            >
              <VolumeX size={32} stroke="#27272a" />
            </button>
          ) : (
            <button
              onClick={() => {
                setMuted(true);
                stopBackgroundMusic();
              }}
            >
              <Volume size={32} stroke="#27272a" />
            </button>
          )}
        </div>
        <ScoreCard />
      </aside>

      {/* Main Game Section */}
      <div className="w-full h-full flex flex-col justify-around items-center">
        <div className="mt-10">
          <AlphabetSection />
        </div>
        <div>
          <GuessedWords />
        </div>
        <div>
          <InputSection />
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="max-w-96 h-full  py-6 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center items-center">
        <Rules />
      </aside>
    </div>
  );
};

export default Game;
