import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentID } from "../../../redux-store/postSlice";
import { styles } from "./styles";
import { Box, Typography, Button, CardMedia, CardContent, CardActions, Card } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { deletePost, likePost } from "../../../redux-store/postSlice";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  let checker = user?.result?.googleId === post.creator || user?.result?._id === post.creator;

  return (
    <Card sx={styles.card}>
      <CardMedia component="img" height="140" image={post.selectedFile} alt="" />
      <Box sx={styles.boxMedia}>
        <Typography variant="h6" component="div" color="white">
          {post.name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div" color="white">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.message}
        </Typography>
        <Typography sx={{ marginTop: "10px" }} variant="subtitle2" color="text.secondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </CardContent>

      <CardActions sx={styles.cardActions}>
        <Button
          size="small"
          sx={styles.likeButton}
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <ThumbUpIcon sx={{ fontSize: "1.2rem" }} />
          <Typography variant="subtitle2" color={!user?.result ? "gray" : "primary"}>
            Like {post.likes.length}
          </Typography>
        </Button>
        {checker && (
          <Button
            href="#form"
            size="small"
            color="secondary"
            sx={styles.editButton}
            onClick={() => {
              dispatch(setCurrentID(post._id));
            }}
          >
            <EditIcon sx={{ fontSize: "1.2rem" }} />
            <Typography variant="subtitle2" color="secondary">
              Edit
            </Typography>
          </Button>
        )}
        {checker && (
          <Button
            size="small"
            color="error"
            sx={styles.deleteButton}
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon sx={{ fontSize: "1.2rem" }} />
            <Typography variant="subtitle2" color="error">
              Delete
            </Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
