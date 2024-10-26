import { addScore } from "@/Redux/features/userGameDataSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast"

const useMistake = () => {
  const {toast} = useToast();
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
      toast({
        variant: "destructive",
        title: "Oopsie Daisy! 😬",
        description: `Looks like you stumbled! You scored ${score} this time. Better luck next round!`,
        className: "bg-red-700 rounded-md border border-white/20 backdrop-blur-md text-white shadow-lg",
    });
    } else if (isMinorMistake(primary, secondary)) {
      score -= 1;
      toast({
        variant: "destructive",
        title: "Whoopsie! 😅",
        description: `Looks like you hit a little bump! You snagged ${score} this round. Keep going!`,
        className: "bg-red-700 rounded-md border border-white/20 backdrop-blur-md text-white shadow-lg",
    });
    
    }
    dispatch(addScore(score));
  };

  return { getNegativeScore };
};

export default useMistake;
