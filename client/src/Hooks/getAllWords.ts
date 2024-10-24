import { setCurrentGameString } from "@/Redux/features/userGameDataSlice";
import { setWords } from "@/Redux/features/wordsData";
import { RootState } from "@/Redux/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useWords = () => {
  const dispatch = useDispatch();
  const wordCount = useSelector((state: RootState) => state.wordsData.wordCount);
  const difficulty = useSelector((state: RootState) => state.userGameData.difficulty);
  const words = useSelector((state: RootState) => state.wordsData.words);

  function shuffleString(gameString: string): string {
    const lettersArray = gameString.split('');
    for (let i = lettersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
    }
    return lettersArray.join('');
  }

  useEffect(() => {
    const fetchWords = async () => {
      if (wordCount && wordCount > 0) { 
        try {
          const response = await fetch(
            `http://localhost:3000/api/words/getWords/${wordCount}/${difficulty}`,
            { method: "GET" }
          );

          const data = await response.json();

          if (response.ok && data?.data.length) {
            dispatch(setWords(data.data)); // Set words in Redux state
            console.log(`The words for the ${difficulty} difficulty are:`, data.data);
          } else {
            console.error("No valid words fetched.");
          }
        } catch (error) {
          console.error("Error fetching words: ", error);
        }
      } else {
        console.warn("wordCount is not properly defined yet.");
      }
    };

    fetchWords();
  }, [difficulty, wordCount, dispatch]);

  useEffect(() => {
    if (words.length > 0 && wordCount) {
      let tempString = '';
      const randomIndex = Math.floor(Math.random() * wordCount);
      for (let i = 0; i < 2; i++) {
        tempString += words[randomIndex];
      }
      const shuffledString = shuffleString(tempString);
      dispatch(setCurrentGameString(shuffledString));
    }
  }, [words, wordCount, dispatch]);

  return { wordCount, difficulty, words };
};

export default useWords;
