import { Router } from "express";
import { bcrypt } from "bcryptjs";
import { User } from "../../model";
import jwt from "jsonwebtoken";
import { dotenv } from "dotenv";
import { authenticate } from "../../middleware";
dotenv.config();

const router = Router();

router.get("/signup", (req, res) => {

  const user = User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const { username, email, password, dob, collegeName, age, percentage10, percentage12, cgpa, phone } = req.body;
  if (!username || !email || !password || !dob || !collegeName || !age || !percentage10 || !percentage12 || !cgpa || !phone) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = User.create({
    username,
    email,
    password: hashedPassword,
    dob,
    collegeName,
    age,
    percentage10,
    percentage12,
    cgpa,
    phone
  })
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.status(200).json({
    message: "User signup is done",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      dob: newUser.dob,
      collegeName: newUser.collegeName,
      age: newUser.age,
      percentage10: newUser.percentage10,
      percentage12: newUser.percentage12,
      cgpa: newUser.cgpa,
      phone: newUser.phone
    },
    token: token,
  });
});

router.get("/login", authenticate, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({
    user,
    message: "User login endpoint",
  });
});
router.get("/profile", (req, res) => {
  const user = req.user;
  if (!user || !user.id) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
  const profile = User.findById(user.id);
  if (!profile) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    user: {
      id: profile._id,
      username: profile.username,
      email: profile.email,
      dob: profile.dob,
      collegeName: profile.collegeName,
      age: profile.age,
      percentage10: profile.percentage10,
      percentage12: profile.percentage12,
      cgpa: profile.cgpa,
      phone: profile.phone
    },
    message: "User profile endpoint",
  });
});

router.get("/logout", (req, res) => {
  res.status(200).json({
    message: "User logout endpoint",
  });
});

export default router;