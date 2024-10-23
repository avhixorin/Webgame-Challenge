import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export enum THEME {
    LIGHT = "light",
    DARK = "dark"
}
export type User = {
  username: string;
  avatar: number | null;
  theme: THEME.LIGHT
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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
