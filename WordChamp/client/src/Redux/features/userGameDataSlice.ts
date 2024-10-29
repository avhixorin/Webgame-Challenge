import { Difficulty, GameData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



function shuffleString(gameString: string): string {
  const lettersArray = gameString.split('');
  for (let i = lettersArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
  }
  return lettersArray.join('');
}

const initialState: GameData = {
  score: 0,
  powerUps: [],
  participants: 1,
  currentGameString: '',
  difficulty: Difficulty.EASY,
  isHosting:true,
  isJoiningRoom:false
};

const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    setGameData: (state, action: PayloadAction<GameData>) => {
      return { ...state, ...action.payload };
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    addScore: (state, action: PayloadAction<number>) => {
      console.log(`Updating score: ${state.score} + ${action.payload}`);
      state.score += action.payload;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload
    },
    setCurrentGameString: (state, action: PayloadAction<string>) => {
      state.currentGameString = shuffleString(action.payload);
    },
    addPowerUp: (state, action: PayloadAction<string>) => {
      state.powerUps.push(action.payload);
    },
    setParticipants: (state, action: PayloadAction<number>) => {
      state.participants = action.payload;
    },
    resetGameData: () => initialState,
  }
});

export const {
  setGameData,
  addPowerUp,
  setCurrentGameString,
  setDifficulty,
  setParticipants,
  addScore,
  setScore,
  resetGameData
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
