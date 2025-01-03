import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db'; // Require connectDB
import swaggerDocs from './docs/swagger'; // Require swaggerDocs

import authRoutes from './routes/auth'; // Require authRoutes
import grantRoutes from './routes/grant'; // Require grantRoutes
import questionRoutes from './routes/question'; // Require questionRoutes
import funderRoutes from './routes/funder'; // Require funderRoutes
import organizationRoutes from './routes/organization'; // Require organizationRoutes



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
app.use('/questions', questionRoutes);
app.use('/funder', funderRoutes);
app.use('/organization', organizationRoutes);




// Home route
app.get('/', (req, res) => res.send('Welcome to the API'));

// Start the server and initialize Swagger Docs
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  swaggerDocs(app, port); // Initialize Swagger
});
