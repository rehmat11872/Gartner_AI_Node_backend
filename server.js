const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const grantRoutes = require('./routes/grant');
const questionRoutes = require('./routes/question');

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/grants', grantRoutes);
app.use('/questions', questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
