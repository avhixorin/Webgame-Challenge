import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DIFFICULTY, setDifficulty, setParticipants, setScore } from '@/Redux/features/userGameDataSlice';
import { setWordCount, setWordsFetched } from '@/Redux/features/wordsData';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const Profile:React.FC = () => {
    const dispatch = useDispatch();

  const [numPlayers, setNumPlayers] = useState<number>(1);
  const [difficulty, setLocalDifficulty] = useState<DIFFICULTY>(
    DIFFICULTY.EASY
  );


  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value));
    setNumPlayers(value);
    dispatch(setParticipants(value));
  };

  const handleSelectDifficulty = (value: DIFFICULTY) => {
    setLocalDifficulty(value);
    dispatch(setDifficulty(value));
    const wordCount =
      value === DIFFICULTY.GOD
        ? 1
        : value === DIFFICULTY.HARD || value === DIFFICULTY.MEDIUM
        ? 3
        : 5;
    dispatch(setWordCount(wordCount));
    dispatch(setWordsFetched(false));
    dispatch(setScore(0));
  };
  return (
    <div className="w-full py-4 flex justify-evenly items-center gap-4">
    <Select onValueChange={handleSelectDifficulty}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={difficulty} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={DIFFICULTY.EASY}>Easy</SelectItem>
        <SelectItem value={DIFFICULTY.MEDIUM}>Medium</SelectItem>
        <SelectItem value={DIFFICULTY.HARD}>Hard</SelectItem>
        <SelectItem value={DIFFICULTY.GOD}>God</SelectItem>
      </SelectContent>
    </Select>
    <Input
      type="number"
      min="1"
      placeholder="Enter number of players"
      className="flex-1 text-gray-900"
      value={numPlayers}
      onChange={handlePlayerChange}
    />
  </div>
  )
}

export default Profile
