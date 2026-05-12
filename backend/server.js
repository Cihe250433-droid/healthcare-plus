const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('HealthCare Plus Backend API is running successfully!');
});

// API Test Route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to HealthCare Plus API',
    version: '1.0.0'
  });
});

// Set Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});