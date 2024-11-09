import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Difficulty, gameMode } from "@/types/types";

function shuffleString(gameString: string): string {
  const lettersArray = gameString.split('');
  for (let i = lettersArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
  }
  return lettersArray.join('');
}

interface SharedGameData {
  maxGameParticipants: number;
  currentGameString: string;
  gameMode: gameMode | null;
  difficulty: Difficulty;
}

const initialSharedState: SharedGameData = {
  maxGameParticipants: 1,
  currentGameString: '',
  gameMode: null,
  difficulty: Difficulty.EASY,
};

const sharedGameDataSlice = createSlice({
  name: "sharedGameData",
  initialState: initialSharedState,
  reducers: {
    setCurrentGameString: (state, action: PayloadAction<string>) => {
      state.currentGameString = shuffleString(action.payload);
    },
    setMaxGameParticipants: (state, action: PayloadAction<number>) => {
      state.maxGameParticipants = action.payload;
    },
    setGameMode: (state, action: PayloadAction<gameMode>) => {
      state.gameMode = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    resetSharedGameData: () => initialSharedState,
  }
});

export const {
  setCurrentGameString,
  setMaxGameParticipants,
  setGameMode,
  setDifficulty,
  resetSharedGameData
} = sharedGameDataSlice.actions;

export default sharedGameDataSlice.reducer;
