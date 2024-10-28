import { createSlice,PayloadAction } from "@reduxjs/toolkit";


type ROOM = {
    roomId: string,
    password: string
}

const initialState:ROOM = {
    roomId: "",
    password: ""
}

const roomSlice = createSlice({
    name:"roomSlice",
    initialState,
    reducers: {
        setRoomPassword: (state,action:PayloadAction<string>) => {
            state.password = action.payload
        },
        setRoomId: (state,action:PayloadAction<string>) => {
            state.roomId = action.payload
        }
    }
})

export const { setRoomId, setRoomPassword} = roomSlice.actions
export default roomSlice.reducer

