import mongoose from "mongoose";

const batchMessageSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  name: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("BatchMessage", batchMessageSchema);