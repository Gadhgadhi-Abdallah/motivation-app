import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api";

// READ POSTS
export const getPosts = createAsyncThunk("post/getPosts", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await API.get("/posts");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// CREATE POST
export const createPosts = createAsyncThunk("post/createPosts", async (newPost, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const res = await API.post("/posts", newPost);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// UPDATE POST
export const updatePost = createAsyncThunk("post/updatePost", async ({ currentID, postData }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await API.patch(`/posts/${currentID}`, postData);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// DELETE POST
export const deletePost = createAsyncThunk("post/updatePost", async (currentID, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    await API.delete(`/posts/${currentID}`);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// LIKE POST
export const likePost = createAsyncThunk("post/updatePost", async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await API.patch(`/posts/${id}/likePost`);
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
      console.log("updated post inspection :" + action.payload);
      console.log(action);
      state.value = state.value.map((post) => (post._id === state.currentID ? action.payload : post));
      state.currentID = null;
    },
    // [updatePost.rejected]: (state, action) => {
    //   console.log(action);
    // },

    // delete posts
    [deletePost.fulfilled]: (state, action) => {
      state.value = state.value.filter((post) => post._id !== state.currentID);
      state.currentID = null;
    },

    // like posts
    [likePost.fulfilled]: (state, action) => {
      state.refrech = !state.refrech;
    },
  },
});

export const { setCurrentID, disableCurrentID } = postSlice.actions;
export default postSlice.reducer;
