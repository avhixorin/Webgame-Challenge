import { Message } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: () => initialState,
  },
});

export const { addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;