import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SocketIOState {
  connected: boolean;
}

const initialState: SocketIOState = {
  connected: false,
};

const SocketIOSlice = createSlice({
  name: "socketIO",
  initialState,
  reducers: {
    setConnect: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  },
});

export const { setConnect } = SocketIOSlice.actions;

export default SocketIOSlice.reducer;
