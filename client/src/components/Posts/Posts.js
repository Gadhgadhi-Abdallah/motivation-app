import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { styles } from "./styles";
import { CircularProgress, Box } from "@mui/material";

export default function Posts() {
  const posts = useSelector((state) => state.posts.value);
  return posts.length ? (
    <Grid container sx={styles.container} spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={5} key={post._id} sx={styles.grid}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20%" }}>
      <CircularProgress sx={{ color: "crimson" }} />
    </Box>
  );
}
