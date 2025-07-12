// routes/notifications.js
import express from "express";
import Notification from "../models/NotificationModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
const router = express.Router();

// Admin sends notification to all users
router.post("/broadcast", async (req, res) => {
  const { text } = req.body;
  const users = await User.find({}, "_id");
  const notifications = users.map(u => ({
    user: u._id,
    text,
  }));
  await Notification.insertMany(notifications);
  res.json({ success: true });
});

router.get("/:userId", async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.params.userId);
    const notifications = await Notification.find({ user: userObjectId }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    res.status(400).json({ error: "Invalid user ID" });
  }
});

export default router;