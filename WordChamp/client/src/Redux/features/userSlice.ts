import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export enum THEME {
    LIGHT = "light",
    DARK = "dark"
}
export type User = {
  username: string;
  avatar: number | null;
  theme: THEME
};

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
      
    }
  },
});

export const { setUser,setTheme } = userSlice.actions;

export default userSlice.reducer;
