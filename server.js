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
import onBoardingRoutes from './routes/onBoarding.js';

dotenv.config();
connectDB();

console.log("Starting server...");

const app = express();
const port = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? ['http://localhost:3000', 'https://granteaterai.netlify.app', 'http://granteaterai.netlify.app', 'http://157.245.202.71']
      : ['http://localhost:3000', 'https://granteaterai.netlify.app', 'http://157.245.202.71'];

    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

console.log('CORS Options:', corsOptions);

app.use(cors(corsOptions)); // Enable CORS with custom options
app.options('*', cors(corsOptions)); // Handle preflight requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onBoardingRoutes);
app.use('/api/grants', grantRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/funder', funderRoutes);
app.use('/api/organization', organizationRoutes);

// Health Check Route
app.get('/healthcheck', (req, res) => {
  console.log('Healthcheck endpoint hit');
  if (req.accepts('json')) {
    return res.json({ message: 'Welcome to the healthcheck' });
  }
  return res.send('Welcome to the healthcheck');
});

app.get('/', (req, res) => {
  return res.send('Welcome to the API');
});

// Swagger Docs Initialization (Production Only)
if (process.env.NODE_ENV === 'production') {
  swaggerDocs(app);
  console.log('Swagger Docs initialized');
}

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});


// Export the app for deployment platforms like Vercel
export default app;