import { useMemo } from 'react';

const countVowels = (word:string) => {
  return word.match(/[aeiou]/gi)?.length || 0;
};

const countConsonants = (word:string) => {
  return word.match(/[bcdfghjklmnpqrstvwxyz]/gi)?.length || 0;
};

const countSyllables = (word:string) => {
  word = word.toLowerCase();
  if (word.length === 0) return 0;
  word = word.replace(/e$/, "");
  const syllableMatches = word.match(/[aeiou]{1,2}/g);
  return syllableMatches ? syllableMatches.length : 1;
};

const useComplexity = (word:string) => {
  return useMemo(() => {
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

    if (uncommonLetters > 0) score += uncommonLetters;

    return Math.min(Math.max(score, 1), 5);
  }, [word]);
};

export default useComplexity;
