import Funder from '../models/funder';

exports.createFunder = async (req, res) => {
    const { funderName, funderMission, funderType } = req.body;

    try {
        const funder = new Funder({
            funderId: new mongoose.Types.ObjectId().toString(),
            funderName,
            funderMission,
            funderType,
            createdBy: req.user._id,
        });

        await funder.save();

        res.status(201).json({ message: 'Funder created successfully.', funderId: funder._id });
    } catch (err) {
        res.status(500).json({ message: 'Error creating funder.', error: err });
    }
};
