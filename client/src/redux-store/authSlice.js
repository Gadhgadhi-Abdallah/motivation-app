import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api";

export const signIn = createAsyncThunk("auth/signIn", async (formData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await API.post("/user/signin", formData);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (formData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await API.post("/user/signup", formData);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.authData = action?.payload;
    },
    [signUp.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.authData = action?.payload;
    },
  },
});

export const { googleAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
