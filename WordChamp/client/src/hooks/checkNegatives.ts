import { addScore } from "@/Redux/features/userGameDataSlice";
import { useDispatch } from "react-redux";
import showToastMessage from "../utils/Toast/useToast";

const useMistake = () => {
  const dispatch = useDispatch();

  const buildCharCount = (word: string) => {
    const charCount: { [key: string]: number } = {};
    for (const char of word) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
  };

  const isMinorMistake = (primary: string, secondary: string) => {
    if (!primary || !secondary) {
      console.warn("Words are missing");
      return false;
    }

    const primaryCount = buildCharCount(primary);
    for (const char of secondary) {
      if (!primaryCount[char] || primaryCount[char] < 1) {
        return false;
      }
      primaryCount[char]--;
    }
    return true;
  };

  const isGraveMistake = (primary: string, secondary: string) => {
    if (!primary || !secondary) {
      console.warn("Words are missing");
      return false;
    }

    const primaryCount = buildCharCount(primary);
    for (const char of secondary) {
      if (!primaryCount[char] || primaryCount[char] < 1) {
        return true;
      }
      primaryCount[char]--;
    }
    return false;
  };

  const getNegativeScore = (primary: string, secondary: string) => {
    let score = 0;
    if (isGraveMistake(primary, secondary)) {
      score -= 2;
      showToastMessage(
        "Almost there! You scored -2 this round. Keep pushing—you’ve got this!",
        "😬",
        "bg-yellow-600"
      );
    } else if (isMinorMistake(primary, secondary)) {
      score -= 1;
      showToastMessage(
        "Just a small setback! You scored -1 this round. Keep pushing forward!",
        "😅",
        "bg-orange-500"
      );
    }
    dispatch(addScore(score));
  };

  return { getNegativeScore };
};

export default useMistake;
