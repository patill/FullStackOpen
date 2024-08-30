import { createSlice } from "@reduxjs/toolkit";

const initialState = "Initial notification state";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationChange(state, action) {
      state = action.payload;
      console.log(JSON.parse(JSON.stringify(state)));
      return state;
    },
    removeNotification(state) {
      state = "";
      return state;
    },
  },
});

export const { notificationChange, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
