import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Safe splitting

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: 'Unauthorized, token not provided' });
    }

    try {
        console.log("Token received:", token);  // Debugging print

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);  // Print decoded token for debugging

        // Find user by ID
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            console.log("User not found");
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (err) {
        console.error("Token verification failed:", err);  // Debugging print
        return res.status(401).json({ message: 'Invalid token' });
    }
};


export default authenticate;
