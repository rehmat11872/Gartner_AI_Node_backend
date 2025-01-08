import Organization from '../models/organization.js';
import mongoose from 'mongoose';

/**
 * Create a new organization
 */
export const createOrganization = async (req, res) => {
    const { organizationName, organizationMission, organizationApproach, organizationAnnualBudget, organizationWebsite } = req.body;
    try {
        const organization = new Organization({
            organizationId: new mongoose.Types.ObjectId().toString(),
            organizationName,
            organizationMission,
            organizationApproach,
            organizationAnnualBudget,
            organizationWebsite,
            createdBy: req.user._id,
        });

        await organization.save();
        res.status(201).json({ message: 'Organization created successfully.', organizationId: organization._id });
    } catch (err) {
        res.status(500).json({ message: 'Error creating organization.', error: err });
    }
};

/**
 * Get all organizations
 */
export const getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching organizations.', error: err });
    }
};

/**
 * Get an organization by ID
 */
export const getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) return res.status(404).json({ message: 'Organization not found' });
        res.status(200).json(organization);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching organization.', error: err });
    }
};

/**
 * Update an organization by ID
 */
export const updateOrganization = async (req, res) => {
    try {
        const updatedOrganization = await Organization.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated document
        );
        if (!updatedOrganization) return res.status(404).json({ message: 'Organization not found' });
        res.status(200).json({ message: 'Organization updated successfully.', updatedOrganization });
    } catch (err) {
        res.status(500).json({ message: 'Error updating organization.', error: err });
    }
};

/**
 * Delete an organization by ID
 */
export const deleteOrganization = async (req, res) => {
    try {
        const deletedOrganization = await Organization.findByIdAndDelete(req.params.id);
        if (!deletedOrganization) return res.status(404).json({ message: 'Organization not found' });
        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting organization.', error: err });
    }
};
