import mongoose from "mongoose";
import PostMessage from "../models/postModels.js";

//CRUD : READ
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(201).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//CRUD : CREATE
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//CRUD : UPDATE
export const updatePost = async (req, res) => {
  const post = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("there is no post with this id !");
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
};

//CRUD : DELETE
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("there is no post with this id !");
  await PostMessage.findByIdAndRemove(id);
  res.json("Post deleted successfully !");
};

//Post like
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.status(404).json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("there is no post with this id !");
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
};
