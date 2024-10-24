import { useState } from "react";

const useWords = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [length, setLength] = useState<number>(5);
  const [gameStr, setGameStr] = useState<string>("");

  const getRandomAlphabet = () => {
    let generatedStr = "";
    for (let i = 0; i < length; i++) {
      generatedStr += letters[Math.floor(Math.random() * letters.length)];
    }
    setGameStr(generatedStr);
    console.log("Generated letters: ", generatedStr);
    return generatedStr;
  };

  const validateWord = async (word: string) => {
    const bodyS = {
      message: word, 
    };

    try {
      const response = await fetch(`http://localhost:3000/${5}/${"hard"}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json', 
        }
      });

      const data = await response.json();

      if (response.ok && data.length) {
        console.log("Valid word: ", word, data);
        return true;
      } else {
        console.log("Not a valid word: ", word);
        return false;
      }
    } catch (error) {
      console.error("Error fetching word definition: ", error);
      return false;
    }
  };

  return { getRandomAlphabet, validateWord, length, setLength, gameStr };
};

export default useWords;
