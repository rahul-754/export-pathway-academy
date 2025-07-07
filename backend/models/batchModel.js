import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
  title: String,
  description: String,
  batchDetails: String,
  metaImage: String,
  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String,
  seatCount: Number,
  enrolledCount: { type: Number, default: 0 },
  medium: { type: String, enum: ['Online', 'Offline'] },
  category: String,
  evaluationEndDate: String,
  batchDetailsRaw: String,
  isPaid: Boolean,
  amount: Number,
  currency: String,
  status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;
