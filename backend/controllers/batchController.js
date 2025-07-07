import Batch from '../models/batchModel.js';
import User from '../models/userModel.js';

// Create batch (Admin)
export const createBatch = async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(201).json(batch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update batch (Admin)
export const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!batch) return res.status(404).json({ error: 'Batch not found' });
    res.json(batch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete batch (Admin)
export const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) return res.status(404).json({ error: 'Batch not found' });
    res.json({ message: 'Batch deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all batches (Admin)
export const getAllBatchesAdmin = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get batches for a user (pass userId as query param)
export const getUserBatches = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const batches = await Batch.find({ members: userId });
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get batch details (only if user is a member, pass userId as query param)
export const getBatchById = async (req, res) => {
  try {
    const userId = req.query.userId;
    const batch = await Batch.findById(req.params.id);
    if (!batch) return res.status(404).json({ error: 'Batch not found' });
    if (userId && !batch.members.map(String).includes(userId)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(batch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List members of a batch
export const getBatchMembers = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate('members', 'name email status');
    if (!batch) return res.status(404).json({ error: 'Batch not found' });
    res.json(batch.members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
