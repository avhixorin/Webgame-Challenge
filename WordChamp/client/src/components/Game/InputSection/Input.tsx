import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";
import { Filter } from "bad-words";
import useValidate from "@/hooks/validateWord";
import useComplexity from "@/hooks/checkComplexity";
import useMistake from "@/hooks/checkNegatives";
import { motion } from "framer-motion";
import CTAButton from "@/utils/CTAbutton/CTAbutton";
import { GameMode, Verdict } from "@/types/types";
import { addAnswer } from "@/Redux/features/answersSlice";
import toast from "react-hot-toast";
import { addGuessedWord } from "@/Redux/features/individualPlayerDataSlice";
import { updateScore } from "@/Redux/features/scoreSlice";
import useSocket from "@/hooks/connectSocket";

const InputSection: React.FC = () => {
  const dispatch = useDispatch();
  const { roomId } = useSelector((state: RootState) => state.room); 
  const { gameMode } = useSelector((state: RootState) => state.individualPlayerData);  
  const { updateMultiPlayerUserScore } = useSocket();
  const filter = new Filter();
  const gameString = useSelector((state: RootState) =>
    state.sharedGameData.currentGameString.toUpperCase().split("")
  );
  const user = useSelector((state: RootState) => state.user.user);
  const [inputWord, setInputWord] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(e.target.value);
  };

  const validate = useValidate(inputWord.toLowerCase());
  const { getScore } = useComplexity();
  const { getNegativeScore } = useMistake();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (filter.isProfane(inputWord)) {
      toast(`Oh no! That's a profane word!`, {
        icon: "🤬",
        style: {
          background: "rgba(255, 0, 0, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          opacity: 0.9,
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });

      dispatch(updateScore({ playerId: user?.username ?? "unknown", score: -3 }));
      
      // Only trigger socket update for multiplayer
      if (gameMode === GameMode.MULTIPLAYER && user?.username) {
        updateMultiPlayerUserScore({ playerId: user.username, score: -3, roomId: roomId });
      }

      dispatch(
        addAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.PROFANE })
      );
      return;
    }

    const isValid = await validate();
    if (isValid) {
      const finalScore = getScore(inputWord.toLowerCase());
      toast(`That's correct! You’ve earned + ${finalScore} points!`, {
        icon: "🎉",
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          opacity: 0.9,
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });

      dispatch(updateScore({ playerId: user?.username ?? "unknown", score: finalScore }));

      // Only trigger socket update for multiplayer
      if (gameMode === GameMode.MULTIPLAYER && user?.username) {
        updateMultiPlayerUserScore({ playerId: user.username, score: finalScore, roomId: roomId, guessedWord: inputWord });
      }

      dispatch(
        addAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.RIGHT })
      );
      setInputWord("");
      dispatch(addGuessedWord(inputWord.toUpperCase()));
      console.log("The guessed word is: ", inputWord);
    } else {
      // Handle invalid word
      getNegativeScore(gameString.join(""), inputWord);
      dispatch(
        addAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.WRONG })
      );
    }
  };

  return (
    <Card className="w-full flex flex-col md:flex-row bg-transparent gap-4 justify-between items-center border-none shadow-none">
      <div className="w-full p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 ease-out">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <CardContent className="flex items-center gap-4">
            <motion.div
              className="flex-1 relative"
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            >
              <Input
                type="text"
                placeholder="Enter a word..."
                className="w-full py-2 px-4 rounded-md text-lg font-semibold text-gray-800 shadow-md bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-blue-400/50"
                value={inputWord.toUpperCase()}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            >
              <CTAButton
                type="submit"
                disabled={false}
                label="Enter"
                onClick={() => {}}
                colour="#3b82f6"
              />
            </motion.div>
          </CardContent>
        </form>
      </div>
      <style>{`
        .font-orbitron {
          font-family: 'Super', sans-serif;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </Card>
  );
};

export default InputSection;
