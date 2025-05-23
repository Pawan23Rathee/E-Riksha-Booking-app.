require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();

// Middleware to parse JSON body
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Your auth routes here (login, register, profile update)...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
