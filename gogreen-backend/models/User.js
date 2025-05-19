// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  age: Number,
  dob: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
