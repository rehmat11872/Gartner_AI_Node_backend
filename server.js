import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Require connectDB
import swaggerDocs from './docs/swagger.js'; // Require swaggerDocs

import authRoutes from './routes/auth.js'; // Require authRoutes
import grantRoutes from './routes/grant.js'; // Require grantRoutes
import questionRoutes from './routes/question.js'; // Require questionRoutes
import funderRoutes from './routes/funder.js'; // Require funderRoutes
import organizationRoutes from './routes/organization.js'; // Require organizationRoutes
import onBoardingRoutes from './routes/onBoarding.js'; 


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onBoardingRoutes);
app.use('/api/grants', grantRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/funder', funderRoutes);
app.use('/api/organization', organizationRoutes);

// Home route
app.get('/', (req, res) => res.send('Welcome to the API'));


app.listen(port, () => {
  console.log(`Server running on ${process.env.NODE_ENV === 'production' ? 'https://granteater-ai-node-backend.vercel.app' : `http://localhost:${port}`}`);
  // console.log(`Server running on port ${port}`);
  swaggerDocs(app, port); // Initialize Swagger
});


// Initialize Swagger (only if necessary on startup)
// swaggerDocs(app, port);

// Export the app for Vercel
export default app;
