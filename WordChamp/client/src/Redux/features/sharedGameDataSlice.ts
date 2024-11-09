import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Difficulty, GameMode, SharedGameData } from "@/types/types";

function shuffleString(gameString: string): string {
  const lettersArray = gameString.split('');
  for (let i = lettersArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
  }
  return lettersArray.join('');
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
    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    setSharedGameData: (state, action: PayloadAction<SharedGameData>) => {
      state = action.payload;
    },
    resetSharedGameData: () => initialSharedState,
  }
});

export const {
  setCurrentGameString,
  setMaxGameParticipants,
  setGameMode,
  setDifficulty,
  setSharedGameData,
  resetSharedGameData
} = sharedGameDataSlice.actions;

export default sharedGameDataSlice.reducer;
