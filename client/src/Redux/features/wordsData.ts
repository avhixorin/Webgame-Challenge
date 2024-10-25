import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Words = {
  wordCount:number,
  words: string[],
  wordsFetched:boolean
};

const initialState:Words = {
  words: [],
  wordCount: 5,
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
    setWordsFetched: (state,action:PayloadAction<boolean>) => {
      state.wordsFetched = action.payload
    },
    resetWords: () => initialState,
  },
});

export const { setWords,setWordsFetched,setWordCount,resetWords } =
  wordsDataSlice.actions;
export default wordsDataSlice.reducer;
