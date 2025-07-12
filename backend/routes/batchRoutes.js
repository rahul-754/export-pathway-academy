import express from 'express';
import {
  createBatch,
  updateBatch,
  deleteBatch,
  getAllBatchesAdmin,
  getUserBatches,
  getBatchById,
  getBatchMembers,
  getBatchMessages
} from '../controllers/batchController.js';
import Batch from '../models/batchModel.js';

const router = express.Router();

// Admin routes
router.post('/', createBatch); // Create a new batch
router.put('/:id', updateBatch); // Update a batch
router.delete('/:id', deleteBatch); // Delete a batch
router.get('/all', getAllBatchesAdmin); // Get all batches (admin view)

// User routes (userId as query param)
router.get('/', getUserBatches); // Get batches for a user
router.get('/:id', getBatchById); // Get batch details (if member)
router.get('/:id/members', getBatchMembers); // Get members of a batch
router.get('/:id/messages', getBatchMessages); // Get messages of a batch

router.get('/admin', async (req, res) => {
  try {
    const batches = await Batch.find({});
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

export default router;
