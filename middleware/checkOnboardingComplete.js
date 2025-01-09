import User from '../models/user.js';


export const checkOnboardingComplete = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.onboardingStatus !== 'complete') {
            return res.status(403).json({ message: 'Complete onboarding to access the dashboard' });
        }

        next(); // Allow access if onboarding is complete
    } catch (err) {
        console.error('Onboarding check error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default organizationLimitMiddleware;