import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import User from "../models/userModels.js";

export const userSingnIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist !" }); //404 Not Found

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "invalide credentials !" }); //400 Bad Request

    const token = Jwt.sign({ email: existingUser.email, id: existingUser._id }, "this is my secret key", { expiresIn: "1h" });
    res.status(200).json({ result: existingUser, token }); // 200 OK
  } catch (error) {
    res.status(500).json({ message: "something went wrong with the server !" }); //500 Internal Server Error
  }
};

export const userSingnUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exist !" }); //400 Bad Request
    if (password !== confirmPassword) return res.status(400).json({ message: "passwords doesn't match !" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });
    const token = await Jwt.sign({ email: result.email, id: result._id }, "this is my secret key", { expiresIn: "1h" });

    res.status(200).json({ result, token }); // 200 OK
  } catch (error) {
    res.status(500).json({ message: "something went wrong with the server !" });
  }
};
