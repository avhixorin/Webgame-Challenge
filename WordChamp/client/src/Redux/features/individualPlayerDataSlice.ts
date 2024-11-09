import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IndividualPlayerData {
  score: number;
  powerUps: string[];
  isHosting: boolean;
  isJoiningRoom: boolean;
}

const initialIndividualState: IndividualPlayerData = {
  score: 0,
  powerUps: [],
  isHosting: true,
  isJoiningRoom: false,
};

const individualPlayerDataSlice = createSlice({
  name: "individualPlayerData",
  initialState: initialIndividualState,
  reducers: {
    addScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    addPowerUp: (state, action: PayloadAction<string>) => {
      state.powerUps.push(action.payload);
    },
    setHostingStatus: (state, action: PayloadAction<boolean>) => {
      state.isHosting = action.payload;
    },
    setJoiningStatus: (state, action: PayloadAction<boolean>) => {
      state.isJoiningRoom = action.payload;
    },
    resetIndividualPlayerData: () => initialIndividualState,
  }
});

export const {
  addScore,
  setScore,
  addPowerUp,
  setHostingStatus,
  setJoiningStatus,
  resetIndividualPlayerData
} = individualPlayerDataSlice.actions;

export default individualPlayerDataSlice.reducer;
