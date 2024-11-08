import { RoomStatus } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



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
    resetRoom: () => initialState,
  },
});

export const { setRoomId, setRoomPassword, setRoomStatus, resetRoom } =
  roomSlice.actions;
export default roomSlice.reducer;
