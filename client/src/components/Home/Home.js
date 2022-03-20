import React, { useEffect } from "react";
import { Container, Grid, Grow } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux-store/postSlice";

function Home() {
  const dispatch = useDispatch();
  const refrech = useSelector((state) => state.posts.refrech);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, refrech]);

  return (
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
  );
}

export default Home;
