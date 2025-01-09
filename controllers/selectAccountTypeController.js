import User from '../models/user.js';

export const selectAccountType = async (req, res) => {
    const { userId, accountType } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.accountType = accountType;
        user.onboardingStatus = 'account_type_selected';
        await user.save();

        res.status(200).json({ message: 'Account type selected successfully' });
    } catch (err) {
        console.error('Error selecting account type:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export default selectAccountType;
