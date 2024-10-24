import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DIFFICULTY {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  GOD = "god"
}

export enum VERDICT {
  RIGHT = "right",
  WRONG = "wrong"
}

type Answer = {
  word: string,
  verdict: VERDICT
};

type GameData = {
  score: number;
  powerUps: string[];
  participants: number;
  currentGameString: string;
  ansWords: Answer[];
  difficulty: DIFFICULTY;
};

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
  ansWords: [],
  difficulty: DIFFICULTY.EASY
};

const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    setGameData: (state, action: PayloadAction<GameData>) => {
      return { ...state, ...action.payload };
    },
    setDifficulty: (state, action: PayloadAction<DIFFICULTY>) => {
      state.difficulty = action.payload;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setCurrentGameString: (state, action: PayloadAction<string>) => {
      state.currentGameString = shuffleString(action.payload);
    },
    addPowerUp: (state, action: PayloadAction<string>) => {
      state.powerUps.push(action.payload);
    },
    addAnswer: (state, action: PayloadAction<Answer>) => {
      state.ansWords.push(action.payload);
    },
    setParticipants: (state, action: PayloadAction<number>) => {
      state.participants = action.payload;
    },
    resetGameData: () => initialState,
  }
});

export const {
  setGameData,
  addAnswer,
  addPowerUp,
  setCurrentGameString,
  setDifficulty,
  setParticipants,
  setScore,
  resetGameData
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
