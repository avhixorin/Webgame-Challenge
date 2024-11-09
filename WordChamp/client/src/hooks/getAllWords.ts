import { setCurrentGameString } from "@/Redux/features/sharedGameDataSlice";
import { setWords, setWordsFetched } from "@/Redux/features/wordsData";
import { RootState } from "@/Redux/store/store";
import { Difficulty } from "@/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useWords = () => {
  const dispatch = useDispatch();
  const wordCount = useSelector((state: RootState) => state.wordsData.wordCount);
  const areWordsFetched = useSelector((state: RootState) => state.wordsData.wordsFetched);
  const difficulty = useSelector((state: RootState) => state.sharedGameData.difficulty);
  const words = useSelector((state: RootState) => state.wordsData.words);

  function shuffleString(gameString: string): string {
    const lettersArray = gameString.split("");
    for (let i = lettersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
    }
    return lettersArray.join("");
  }

  useEffect(() => {
    const fetchWords = async () => {
      if (wordCount > 0 && !areWordsFetched) {
        try {
          const response = await fetch(`http://localhost:3000/api/words/getWords/${wordCount}/${difficulty}`, {
            method: "GET",
          });
          const data = await response.json();
          
          if (response.ok && Array.isArray(data.data) && data.data.length > 0) {
            dispatch(setWords(data.data));
            dispatch(setWordsFetched(true));
          } else {
            console.error("No valid words fetched or data is not an array.");
          }
        } catch (error) {
          console.error("Error fetching words: ", error);
        }
      }
    };
    fetchWords();
  }, [difficulty, wordCount, areWordsFetched, dispatch]);

  useEffect(() => {
    if (Array.isArray(words) && words.length > 0 && wordCount) {
      let tempString = "";
      const randomIndex = Math.floor(Math.random() * wordCount);

      if (wordCount === 1) {
        tempString += words[0];
      } else {
        if(difficulty === Difficulty.EASY){
          for (let i = 0; i < 4; i++) {
            tempString += words[i];
          }
        }
        
        tempString = tempString.slice(0, 10);
      }

      const shuffledString = shuffleString(tempString);
      dispatch(setCurrentGameString(shuffledString));
    }
  }, [words, wordCount, dispatch,difficulty]);

  return { wordCount, difficulty, words };
};

export default useWords;
