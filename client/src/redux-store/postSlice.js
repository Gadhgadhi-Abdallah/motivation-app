import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// WHEN WORKING LOCAL
const baseURL = "http://localhost:5000/posts";
// const baseURL = "https://motivation-io.herokuapp.com/posts";

// READ POSTS
export const getPosts = createAsyncThunk("post/getPosts", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.get(baseURL);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// CREATE POST
export const createPosts = createAsyncThunk("post/createPosts", async (newPost, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const res = await axios.post(baseURL, newPost);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// UPDATE POST
export const updatePost = createAsyncThunk("post/updatePost", async ({ currentID, postData }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.patch(`${baseURL}/${currentID}`, postData);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// DELETE POST
export const deletePost = createAsyncThunk("post/updatePost", async (currentID, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    await axios.delete(`${baseURL}/${currentID}`);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// LIKE POST
export const likePost = createAsyncThunk("post/updatePost", async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.patch(`${baseURL}/${id}/likePost`);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState: { value: [], isLoding: false, currentID: null, refrech: false },
  reducers: {
    setCurrentID: (state, action) => {
      state.currentID = action.payload;
    },
    disableCurrentID: (state, action) => {
      state.currentID = null;
    },
  },
  extraReducers: {
    // get posts
    [getPosts.pending]: (state, action) => {
      state.isLoding = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.value = action.payload;
    },

    // create posts
    [createPosts.fulfilled]: (state, action) => {
      state.value.push(action.payload);
    },

    // update posts
    [updatePost.fulfilled]: (state, action) => {
      state.value = state.value.map((post) => (post._id === state.currentID ? action.payload : post));
      state.currentID = null;
      // state.refrech = !state.refrech;
    },

    // delete posts
    [deletePost.fulfilled]: (state, action) => {
      state.value = state.value.filter((post) => post._id !== state.currentID);
      state.currentID = null;
      // state.refrech = !state.refrech;
    },

    // like posts
    [likePost.fulfilled]: (state, action) => {
      state.refrech = !state.refrech;
      // state.currentID = null;
    },
  },
});

export const { setCurrentID, disableCurrentID } = postSlice.actions;
export default postSlice.reducer;
