import { easyWords, godWords, hardWords, mediumWords } from "../../constants/Words";
import { Difficulty } from "../../types/Types";

const getCurrentGameString = (difficulty: Difficulty): string => {
  let wordPool: string[] = [];
  let wordCount: number;

  switch (difficulty) {
    case Difficulty.EASY:
      wordPool = easyWords;
      wordCount = 5;
      break;
    case Difficulty.MEDIUM:
      wordPool = mediumWords;
      wordCount = 4;
      break;
    case Difficulty.HARD:
      wordPool = hardWords;
      wordCount = 3;
      break;
    case Difficulty.GOD:
      wordPool = godWords;
      wordCount = 1;
      break;
    default:
      wordPool = easyWords;
      wordCount = 5;
  }

  const shuffleString = (gameString: string): string => {
    const lettersArray = gameString.split("");
    for (let i = lettersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
    }
    return lettersArray.join("");
  };

  let tempString = "";
  for (let i = 0; i < wordCount && i < wordPool.length; i++) {
    const randomIndex = Math.floor(Math.random() * wordPool.length);
    tempString += wordPool[randomIndex];
  }

  tempString = tempString.slice(0, 10);

  return shuffleString(tempString);
};

export default getCurrentGameString;
