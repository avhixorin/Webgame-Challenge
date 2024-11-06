import React, { useEffect } from "react";
import "../../index.css";
import AlphabetSection from "./AlphabetSection/Alphabets";
import InputSection from "./InputSection/Input";
import GuessedWords from "./GuessedWords/GuessedWords";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative flex flex-col justify-around items-center bg-game-bg1 bg-center bg-cover w-full p-4 h-full">
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
  );
};

export default Game;
