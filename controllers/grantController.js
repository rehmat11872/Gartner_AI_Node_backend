import Grant from '../models/grant';

exports.createGrant = async (req, res) => {
    const { title, description } = req.body;
    try {
        const grant = new Grant({ title, description, createdBy: req.user._id });
        await grant.save();
        res.status(201).json(grant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllGrants = async (req, res) => {
    try {
        const grants = await Grant.find().populate('createdBy', 'username');
        res.status(200).json(grants);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getGrantById = async (req, res) => {
    try {
        const grant = await Grant.findById(req.params.id).populate('createdBy', 'username');
        if (!grant) return res.status(404).json({ message: 'Grant not found' });
        res.status(200).json(grant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
