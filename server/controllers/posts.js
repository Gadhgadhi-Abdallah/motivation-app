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
  const newPost = new PostMessage(post);

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
  // extract the id from req.params and rename it to _id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("there is no post with this id !");

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("there is no post with this id !");
  await PostMessage.findByIdAndRemove(id);
  res.json("Post deleted successfully !");
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("there is no post with this id !");

  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  res.json(updatedPost);
};
