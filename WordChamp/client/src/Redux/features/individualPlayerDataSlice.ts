import { GameMode, IndividualGameData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialIndividualState: IndividualGameData = {
  powerUps: [],
  guessedWords: [],
  gameMode: GameMode.SOLO,
  isHosting: true,
  isJoiningRoom: false,
};

const individualPlayerDataSlice = createSlice({
  name: "individualPlayerData",
  initialState: initialIndividualState,
  reducers: {
    addPowerUp: (state, action: PayloadAction<string>) => {
      state.powerUps.push(action.payload);
    },
    setHostingStatus: (state, action: PayloadAction<boolean>) => {
      state.isHosting = action.payload;
    },
    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload;
    },
    setJoiningStatus: (state, action: PayloadAction<boolean>) => {
      state.isJoiningRoom = action.payload;
    },
    addGuessedWord: (state, action: PayloadAction<string>) => {
      state.guessedWords.push(action.payload);
    },
    resetIndividualPlayerData: () => initialIndividualState,
  }
});

export const {
  addPowerUp,
  setGameMode,
  addGuessedWord,
  setHostingStatus,
  setJoiningStatus,
  resetIndividualPlayerData
} = individualPlayerDataSlice.actions;

export default individualPlayerDataSlice.reducer;
