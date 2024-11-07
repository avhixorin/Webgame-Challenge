import { addScore } from "@/Redux/features/userGameDataSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const useMistake = () => {
  const dispatch = useDispatch();

  const buildCharCount = (word: string) => {
    const charCount: { [key: string]: number } = {};
    for (const char of word) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
  };

  // Minor Mistake: Minor mismatches in character count but overall includes necessary letters
  const isMinorMistake = (primary: string, secondary: string) => {
    if (!primary || !secondary) {
      console.warn("Words are missing");
      return false;
    }

    const primaryCount = buildCharCount(primary);
    let minorMistake = false;

    for (const char of secondary) {
      if (!primaryCount[char]) {
        return false; // If character is absent in `primary`, not a minor mistake
      }
      primaryCount[char]--;
      if (primaryCount[char] < 0) {
        minorMistake = true; // Indicates slight overuse but not a grave mistake
      }
    }
    return minorMistake; // Returns true if it's close to matching
  };

  // Grave Mistake: Marks only if there’s a character entirely missing or way off
  const isGraveMistake = (primary: string, secondary: string) => {
    if (!primary || !secondary) {
      console.warn("Words are missing");
      return false;
    }

    const primaryCount = buildCharCount(primary);

    for (const char of secondary) {
      if (!primaryCount[char]) {
        return true; // Character entirely missing from `primary` = Grave Mistake
      }
      primaryCount[char]--;
      if (primaryCount[char] < -1) {
        return true; // Excessive overuse (e.g., more than one extra use) counts as grave
      }
    }
    return false; // No missing characters, so not a grave mistake
  };

  const getNegativeScore = (primary: string, secondary: string) => {
    let score = 0;
    if (isGraveMistake(primary, secondary)) {
      score -= 2;
      toast("Almost there! You scored -2 this time", {
        icon: "😬",
        style: {
          background: "rgba(255, 255, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          opacity: 0.9,
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });
    } else if (isMinorMistake(primary, secondary)) {
      score -= 1;
      toast("Just a small setback! You scored -1 this time", {
        icon: "😅",
        style: {
          background: "rgba(255, 165, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          opacity: 0.9,
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });
    }
    dispatch(addScore(score));
  };

  return { getNegativeScore };
};

export default useMistake;
