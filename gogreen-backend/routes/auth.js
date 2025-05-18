const express = require('express');
const router = express.Router();
const User = require('../models/User'); // make sure this path is correct

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, age, dob, password } = req.body;

    if (!name || !email || !phone || !age || !dob || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, email, phone, age, dob, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

module.exports = router;
