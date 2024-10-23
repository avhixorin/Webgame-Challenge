import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum DIFFICULTY {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

type GameData = {
    score: number;
    powerUps: string[];
    participants: number;
    currentGameString: string;
    ansWords: string[];
    difficulty: DIFFICULTY;
}

const initialState: GameData = {
    score: 0,
    powerUps: [], 
    participants: 1,
    currentGameString: '',
    ansWords: [],
    difficulty: DIFFICULTY.EASY
}

const gameDataSlice = createSlice({
    name: "gameData", 
    initialState,
    reducers: {
        setGameData: (state, action: PayloadAction<GameData>) => {
            return { ...state, ...action.payload }; 
        },
        resetGameData: () => initialState, 
    }
});

export const { setGameData, resetGameData } = gameDataSlice.actions;
export default gameDataSlice.reducer;
