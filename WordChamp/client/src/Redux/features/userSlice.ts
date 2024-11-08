import { THEME, User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setTheme: (state,action:PayloadAction<THEME>) => {
      if (state.user) {
        state.user.theme = action.payload;
      }
    },
    resetUser: () => initialState,
  },
});

export const { setUser,setTheme } = userSlice.actions;

export default userSlice.reducer;
