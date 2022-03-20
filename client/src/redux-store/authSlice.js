import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { authData: null },
  reducers: {
    googleAuth: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.authData = action?.payload;
    },
    logOut: (state, action) => {
      localStorage.clear();
      state.authData = null;
    },
  },
});

export const { googleAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
