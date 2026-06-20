import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/swad_vatika';

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api', apiRoutes);

// Base route for server health check
app.get('/', (req, res) => {
  res.status(200).send('Swad Vatika Luxury Restaurant API Server is running.');
});

// Connect to MongoDB & Start Server
console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB. Server not started.', err.message);
    process.exit(1);
  });
