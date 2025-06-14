const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with detailed logging
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Database name:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Add connection event listeners
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
const colorRoutes = require('./routes/colorRoutes');
app.use('/api/colors', colorRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 