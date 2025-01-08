import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'; 
import User from '../models/user.js';

export const signup = async (req, res) => {
    const { email, password, accountType } = req.body;
    try {
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            id: String(new mongoose.Types.ObjectId()), // Generate a unique ID
            email,
            password: hashedPassword,
            accountType: accountType || 'Basic',
            creditBalance: 0,
        });

        // Save the user to the database
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Debugging logs
        console.log("Password from request:", password);
        console.log("Hashed password from DB:", user.password);

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Update engagement metrics
        // user.engagementMetrics.lastActivity = new Date();
        // await user.save();

        res.status(200).json({
            token,
            userId: user.id,
            email: user.email,
            accountType: user.accountType,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: err.message });
    }
};