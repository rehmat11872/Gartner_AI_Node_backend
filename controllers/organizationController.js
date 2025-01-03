import Organization from '../models/organization';

exports.createOrganization = async (req, res) => {
    const { organizationName, organizationMission } = req.body;

    try {
        const organization = new Organization({
            organizationId: new mongoose.Types.ObjectId().toString(),
            organizationName,
            organizationMission,
            createdBy: req.user._id,
        });

        await organization.save();

        res.status(201).json({ message: 'Organization created successfully.', organizationId: organization._id });
    } catch (err) {
        res.status(500).json({ message: 'Error creating organization.', error: err });
    }
};
