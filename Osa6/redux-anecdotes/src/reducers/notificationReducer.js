import { createSlice } from "@reduxjs/toolkit";

const initialState = "Something";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationChange(state, action) {
      state = action.payload;
      console.log(JSON.parse(JSON.stringify(state)));
      return state;
    },
  },
});

export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;
