// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    let { name, email, phone, age, dob, password } = req.body;

    if (!name || !email || !phone || !age || !dob || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    email = email.toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, phone, age, dob, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        age: newUser.age,
        dob: newUser.dob,
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    email = email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { _id, name, phone, age, dob } = user;

    res.status(200).json({
      message: 'Login successful',
      user: { id: _id, name, email, phone, age, dob },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Profile Update
router.put('/profile/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, phone, age, dob } = req.body;

    console.log("Updating profile:", { userId, name, phone, age, dob });

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, age, dob },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        age: updatedUser.age,
        dob: updatedUser.dob
      },
    });
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

module.exports = router;
