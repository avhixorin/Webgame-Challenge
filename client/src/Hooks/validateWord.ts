import { RootState } from "@/Redux/store/store";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const useValidate = (word: string) => {
  const currentGameString = useSelector(
    (state: RootState) => state.userGameData.currentGameString
  );

  const doesIncludes = (primary: string, secondary: string) => {
    if (primary && secondary) {
      const primaryCount: { [key: string]: number } = {};

      for (const char of primary) {
        primaryCount[char] = (primaryCount[char] || 0) + 1;
      }

      for (const char of secondary) {
        if (!primaryCount[char]) {
          return false; 
        }
        primaryCount[char]--; 
        if (primaryCount[char] < 0) {
          return false;
        }
      }
      return true; 
    } else {
      console.warn("Words are missing");
      alert("Words are missing");
      return false;
    }
  };

  const validate = useCallback(async (): Promise<boolean> => {
    if (doesIncludes(currentGameString, word)) { 
      if (word.length > 0) {
        try {
          const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
          );

          if (response.ok) {
            return true;
          } else {
            return false; 
          }
        } catch (error) {
          console.error("Error validating word:", error);
          return false;
        }
      }
    } else {
      alert("Please enter a word that uses only the allowed letters.");
      return false;
    }
    return false;
  }, [word, currentGameString]);

  return validate;
};

export default useValidate;
