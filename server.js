import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import swaggerDocs from './docs/swagger.js';

import authRoutes from './routes/auth.js';
import grantRoutes from './routes/grant.js';
import questionRoutes from './routes/question.js';
import funderRoutes from './routes/funder.js';
import organizationRoutes from './routes/organization.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grants', grantRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/funder', funderRoutes);
app.use('/api/organization', organizationRoutes);

// Home route
app.get('/', (req, res) => res.send('Welcome to the API'));

// Initialize Swagger (only if necessary on startup)
swaggerDocs(app, port);

// Export the app for Vercel
export default app;
