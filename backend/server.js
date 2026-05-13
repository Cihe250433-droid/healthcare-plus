const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('HealthCare Plus Backend API is running successfully!');
});

// API test route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to HealthCare Plus API',
    version: '1.0.0'
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});