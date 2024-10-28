import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum RoomStatus {
  HOSTING = "hosting",
  JOINING = "joining",
  NONE = "none",
}

interface RoomState {
  roomId: string;
  password: string;
  status: RoomStatus;
}

const initialState: RoomState = {
  roomId: "",
  password: "",
  status: RoomStatus.NONE,
};

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    setRoomPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setRoomStatus: (state, action: PayloadAction<RoomStatus>) => {
      state.status = action.payload;
    },
    clearRoomData: (state) => {
      state.roomId = "";
      state.password = "";
      state.status = RoomStatus.NONE;
    },
  },
});

export const { setRoomId, setRoomPassword, setRoomStatus, clearRoomData } =
  roomSlice.actions;
export default roomSlice.reducer;
