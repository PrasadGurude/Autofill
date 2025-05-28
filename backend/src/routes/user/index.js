const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../model/index.js");

const { authenticate } = require("../../middleware.js");
dotenv.config();

const router = Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const {username, email, password, dob, collegeName, age, percentage10, percentage12, cgpa, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      dob: dob,
      collegeName: collegeName,
      age: parseInt(age, 10),
      percentage10: parseInt(percentage10, 10),
      percentage12: parseInt(percentage12, 10),
      cgpa: parseInt(cgpa, 10), 
      phone: parseInt(phone, 10)
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({
      message: "User signup successful",
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
      token
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        collegeName: user.collegeName,
        dob: user.dob,
        age: user.age,
        percentage10: user.percentage10,
        percentage12: user.percentage12,
        cgpa: user.cgpa
      },
      token
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// PROFILE
router.get("/profile", authenticate, async (req, res) => {
  const userId = req.user?.id;

  try {
    const profile = await User.findById(userId);
    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User profile fetched",
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
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// LOGOUT (just a placeholder; token-based logout typically handled on client)
router.get("/logout", (req, res) => {
  return res.status(200).json({ message: "User logged out (client should remove token)" });
});

module.exports = router;