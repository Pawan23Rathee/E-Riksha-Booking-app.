const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Enable CORS for frontend origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // required if sending cookies or auth headers
}));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // supports multipart/form-data if needed

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
