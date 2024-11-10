// import { addScore } from '@/Redux/features/individualPlayerDataSlice';
import { updateScore } from '@/Redux/features/scoreSlice';
import { RootState } from '@/Redux/store/store';
import { useDispatch, useSelector } from 'react-redux';

const countVowels = (word:string) => word.match(/[aeiou]/gi)?.length || 0;
const countConsonants = (word:string) => word.match(/[bcdfghjklmnpqrstvwxyz]/gi)?.length || 0;
const countSyllables = (word:string) => {
  word = word.toLowerCase().replace(/e$/, "");
  const syllableMatches = word.match(/[aeiou]{1,2}/g);
  return syllableMatches ? syllableMatches.length : 1;
};

const useComplexity = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const getScore = (word:string) => {
    if (!word || typeof word !== 'string') return 1;
    
    const length = word.length;
    const vowels = countVowels(word);
    const consonants = countConsonants(word);
    const syllables = countSyllables(word);
    const uncommonLetters = (word.match(/[qxz]/gi) || []).length;
    let score = 1;

    if (length > 10) score += 1;
    if (length > 15) score += 1;
    if (vowels > consonants) score -= 1;
    if (syllables > 2) score += 1;
    if (syllables > 4) score += 1;
    score += uncommonLetters;

    const finalScore = Math.min(Math.max(score, 1), 5);
    if(user.user) dispatch(updateScore({ playerId: user.user?.username, score: finalScore }));
    return finalScore
  };

  return { getScore };
};

export default useComplexity;
