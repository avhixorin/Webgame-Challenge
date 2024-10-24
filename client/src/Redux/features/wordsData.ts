import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Words = {
  wordCount:number,
  words: string[],
  wordsFetched:boolean
};

const initialState:Words = {
  words: [],
  wordCount: 0,
  wordsFetched: false,
};


const wordsDataSlice = createSlice({
  name: "wordsData",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<string[]>) => {
      state.words = action.payload;
    },
    setWordCount: (state,action:PayloadAction<number>) => {
      state.wordCount = action.payload
    },
    resetWords: () => initialState,
  },
});

export const { setWords } =
  wordsDataSlice.actions;
export default wordsDataSlice.reducer;
