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
        const updatedFunder = await Funder.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated document
        );
        if (!updatedFunder) return res.status(404).json({ message: 'Funder not found' });
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
        res.status(200).json({ message: 'Funder deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting funder.', error: err });
    }
};
