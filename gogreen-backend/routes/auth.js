const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/cloudinaryUpload'); // cloudinary multer middleware

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, age, dob, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, phone, age, dob, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age,
        dob: user.dob,
        profilePic: user.profilePic,
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload profile picture to Cloudinary
router.post('/upload-profile-pic', upload.single('profilePic'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Image upload failed' });
  }

  res.json({ path: req.file.path }); // full Cloudinary URL
});

// Update profile
router.post('/upload-profile-pic', upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_pics',
    });

    res.json({ url: result.secure_url });  // ✅ Return Cloudinary image URL
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});


module.exports = router;
