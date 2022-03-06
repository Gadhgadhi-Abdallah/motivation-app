import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grid, Grow } from "@mui/material";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import motivation from "./images/motivation.png";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./store/postSlice";

export default function App() {
  const dispatch = useDispatch();
  const refrech = useSelector((state) => state.posts.refrech);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, refrech]);

  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" sx={styles.appbar}>
        <Typography variant="h4" component="h1" sx={styles.heading}>
          Motivation
        </Typography>
        <img src={motivation} alt="" width="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} md={8}>
              <Posts />
            </Grid>
            <Grid item xs={12} md={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
