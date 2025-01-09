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

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://localhost:3000/', 'https://granteaterai.netlify.app/', 'http://granteaterai.netlify.app'] // Add both production URLs
    : ['http://localhost:3000', 'https://granteaterai.netlify.app'], // Add local development URL and the Netlify app
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onBoardingRoutes);
app.use('/api/grants', grantRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/funder', funderRoutes);
app.use('/api/organization', organizationRoutes);

// Home route
app.get('/healthcheck', (req, res) => {
  // If the client asks for JSON
  if (req.accepts('json')) {
    return res.json({ message: 'Welcome to the API' });
  }

  // Otherwise return text
  return res.send('Welcome to the API');
});


// Initialize Swagger Docs (only in production)
if (process.env.NODE_ENV === 'production') {
  swaggerDocs(app);  // Initialize Swagger in production only
}

// app.listen(port, () => {
//   console.log(`Server running on ${process.env.NODE_ENV === 'production' ? 'https://granteater-ai-node-backend.vercel.app' : `http://localhost:${port}`}`);
//   // console.log(`Server running on port ${port}`);
//   swaggerDocs(app, port); // Initialize Swagger
// });


// Initialize Swagger (only if necessary on startup)
// swaggerDocs(app, port);

// Export the app for Vercel
export default app;
