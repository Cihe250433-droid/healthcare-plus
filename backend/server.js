const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('HealthCare Plus Backend API is running successfully!');
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to HealthCare Plus API',
    version: '1.0.0'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`Server running on http://localhost:${PORT}`);
});
=======
  console.log(` Server running on http://localhost:${PORT}`);
});
>>>>>>> 375395eb8be3d61c7b393e70afcf457909616328
