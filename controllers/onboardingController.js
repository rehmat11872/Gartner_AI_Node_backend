import User from '../models/user.js';
import Funder from '../models/funder.js';
import mongoose from 'mongoose';

const completeOnboarding = async (req, res) => {
    const { userId, funderDetails } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the organization is created
        if (!user.hasCreatedOrganization) {
            return res.status(400).json({ message: 'Organization must be created to complete onboarding' });
        }

        // Handle optional funder creation
        if (funderDetails) {
            const funder = new Funder({
                funderId: new mongoose.Types.ObjectId().toString(),
                ...funderDetails,
                createdBy: userId,
            });
            await funder.save();
            
            // Update user's funder status
            user.onboardingStatus = 'funder_created';
            user.hasCreatedFunder = true;
        }

        // Mark onboarding as complete
        user.onboardingStatus = 'complete';
        await user.save();

        res.status(200).json({ message: 'Onboarding completed successfully. You can now access the dashboard.' });
    } catch (err) {
        console.error('Error completing onboarding:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export default completeOnboarding
export default completeOnboarding;
