import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { getPosts, createPost, updatePost, deletePost, likePost } from "./controllers/posts.js";
import { userSingnIn, userSingnUp } from "./controllers/user.js";
import auth from "./middleware/auth.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "3mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to motivation API");
});
//posts routes
app.get("/posts", getPosts);
app.post("/posts", auth, createPost);
app.patch("/posts/:id", auth, updatePost);
app.delete("/posts/:id", auth, deletePost);
app.patch("/posts/:id/likePost", auth, likePost);

//user routes
app.post("/user/signin", userSingnIn);
app.post("/user/signup", userSingnUp);

const port = process.env.PORT || 5000;

// Enter your mongodb CONNECTION_URL in your .env file

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`server running on port: ${port}`)))
  .catch((error) => console.log(error.message));
