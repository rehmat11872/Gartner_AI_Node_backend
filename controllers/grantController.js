import Grant from '../models/grant.js';

export const createGrant = async (req, res) => {
    const { title, description, organizationId, funderId, dueDate } = req.body;
  
    try {
      // Validate required fields
      if (!title || !organizationId || !dueDate) {
        return res.status(400).json({ message: 'Title, Organization ID, and Due Date are required.' });
      }
  
      // Create new grant
      const grant = new Grant({
        title,
        description,
        organizationId,
        funderId: funderId || null, // Optional funder
        userId: req.user._id, // Authenticated user's ID
        dueDate,
      });
  
      await grant.save();
  
      res.status(201).json({ message: 'Grant created successfully.', grant });
    } catch (error) {
      console.error('Error creating grant:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
  

export const getAllGrants = async (req, res) => {
    try {
      const grants = await Grant.find()
        .populate('organizationId', 'organizationName') // Include organization name
        .populate('funderId', 'funderName') // Include funder name if available
        .populate('userId', 'email'); // Include creator's email
      res.status(200).json(grants);
    } catch (error) {
      console.error('Error fetching grants:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
  

export const getGrantById = async (req, res) => {
    try {
      const grant = await Grant.findById(req.params.id)
        .populate('organizationId', 'organizationName organizationDetails')
        .populate('funderId', 'funderName funderDetails')
        .populate('userId', 'email');
  
      if (!grant) {
        return res.status(404).json({ message: 'Grant not found.' });
      }
  
      res.status(200).json(grant);
    } catch (error) {
      console.error('Error fetching grant:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

  
export const deleteGrant = async (req, res) => {
    try {
      const grant = await Grant.findByIdAndDelete(req.params.id);
      if (!grant) {
        return res.status(404).json({ message: 'Grant not found.' });
      }
      res.status(200).json({ message: 'Grant deleted successfully.' });
    } catch (error) {
      console.error('Error deleting grant:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
  
