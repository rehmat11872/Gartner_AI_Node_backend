import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import swaggerDocs from './docs/swagger.js';

import authRoutes from './routes/auth.js';
import grantRoutes from './routes/grant.js';
import questionRoutes from './routes/question.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/grants', grantRoutes);
app.use('/questions', questionRoutes);

// Home route
app.get('/', (req, res) => res.send('Welcome to the API'));

// Start the server and initialize Swagger Docs
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  swaggerDocs(app, port); // Initialize Swagger
});
