import Organization from '../models/organization';

const organizationLimitMiddleware = async (req, res, next) => {
    const user = req.user; // Assuming authMiddleware has set `req.user`

    try {
        const orgCount = await Organization.countDocuments({ createdBy: user._id });

        if (user.accountType === 'Basic' && orgCount >= 1) {
            return res.status(403).json({ message: 'Free-tier users can only create one organization.' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = organizationLimitMiddleware;
