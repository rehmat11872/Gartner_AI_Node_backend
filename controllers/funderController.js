import Funder from '../models/funder.js';
import mongoose from 'mongoose';

/**
 * Create a new funder
 */
export const createFunder = async (req, res) => {
    const { funderName, funderMission, funderType, funderGeographicFocus, contact } = req.body;
    try {
        const funder = new Funder({
            funderId: new mongoose.Types.ObjectId().toString(),
            funderName,
            funderMission,
            funderType,
            funderGeographicFocus,
            contact,
            createdBy: req.user._id,
        });

        await funder.save();
        res.status(201).json({ message: 'Funder created successfully.', funderId: funder._id });
    } catch (err) {
        res.status(500).json({ message: 'Error creating funder.', error: err });
    }
};

/**
 * Get all funders
 */
export const getFunders = async (req, res) => {
    try {
        const funders = await Funder.find();
        res.status(200).json(funders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching funders.', error: err });
    }
};

/**
 * Get a specific funder by ID
 */
export const getFunderById = async (req, res) => {
    try {
        const funder = await Funder.findById(req.params.id);
        if (!funder) return res.status(404).json({ message: 'Funder not found' });
        res.status(200).json(funder);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching funder.', error: err });
    }
};

/**
 * Update a funder by ID
 */
export const updateFunder = async (req, res) => {
    try {
        // Find and update the funder
        const updatedFunder = await Funder.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Update the funder fields with the request body
            { new: true } // Return the updated document
        );

        if (!updatedFunder) return res.status(404).json({ message: 'Funder not found' });

        // Optionally update the users associated with this funder
        const { funderName } = req.body; // Assuming you want to update the funder name

        if (funderName) {
            // Update the users who are associated with this funder
            await User.updateMany(
                { funder_ids: updatedFunder._id },
                { $set: { 'funder_ids.$[funder].funderName': funderName } }, // Update the funderName field for each user
                { arrayFilters: [{ 'funder': { $eq: updatedFunder._id } }] } // Filter only the specific funder in the array
            );
        }

        res.status(200).json({ message: 'Funder updated successfully.', updatedFunder });
    } catch (err) {
        res.status(500).json({ message: 'Error updating funder.', error: err });
    }
};


/**
 * Delete a funder by ID
 */
export const deleteFunder = async (req, res) => {
    try {
        const deletedFunder = await Funder.findByIdAndDelete(req.params.id);
        if (!deletedFunder) return res.status(404).json({ message: 'Funder not found' });

        // Remove the funder reference from users
        await User.updateMany(
            { funder_ids: deletedFunder._id },
            { $pull: { funder_ids: deletedFunder._id } } // Remove the funder reference from users
        );

        res.status(200).json({ message: 'Funder deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting funder.', error: err });
    }
};
