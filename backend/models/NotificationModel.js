// models/notificationModel.js
import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  text: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Notification", notificationSchema);