import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { Paper, TextField, Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import FileBase from "react-file-base64";
import { createPosts, disableCurrentID, updatePost, getPosts } from "../../redux-store/postSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Form() {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const currentID = useSelector((state) => state.posts.currentID);
  const posts = useSelector((state) => state.posts.value);
  const post = currentID ? posts.find((p) => p._id === currentID) : null;

  // Populate the post in the form when there is a currentID
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (currentID) {
      dispatch(updatePost({ currentID, postData }));
      dispatch(getPosts());
    } else {
      dispatch(createPosts(postData));
    }
    clear();
  };

  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    dispatch(disableCurrentID());
  };

  return (
    <Box sx={styles.box}>
      <Paper elevation={3} sx={styles.paper}>
        <Typography variant="subtitle1" sx={styles.heading}>
          {!currentID ? "Create a" : "Edit "} Post
        </Typography>
        <form autoComplete="off" onSubmit={handelSubmit}>
          <TextField
            sx={styles.textField}
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
          />
          <TextField
            sx={styles.textField}
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
          <TextField
            sx={styles.textField}
            label="Message"
            multiline
            rows={3}
            fullWidth
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />

          <TextField
            sx={styles.textField}
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
          />
          <Box sx={styles.file64}>
            <FileBase
              type="file"
              multiple={false}
              onDone={(file) => {
                setPostData({ ...postData, selectedFile: file.base64 });
              }}
            />
          </Box>
          <Box sx={styles.buttons}>
            <Button sx={{ marginRight: "20px" }} type="submit" variant="contained" startIcon={<SaveIcon />}>
              Submit
            </Button>
            <Button variant="outlined" endIcon={<DeleteIcon />} color="error" onClick={clear}>
              Clear
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
