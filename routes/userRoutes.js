import express from "express";

import User from "../models/User.js";
import { signToken } from "../utils/auth.js";

const router = express.Router();

//POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    //  const { email } = req.body;
    // const existingUser = await User.findOne({email});
    // if (existingUser) {
    //   return res
    //     .status(400)
    //     .json({ message: `User with this ${existingUser} already exists` });
    // }
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//POST /api/users/login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "Can't find the user" });
    }

    const correctPassword = await user.isCorrectPassword(req.body.password);
    if (!correctPassword) {
      res.status(400).json({ message: "wrong password" });
    }

    const token = signToken(user);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
