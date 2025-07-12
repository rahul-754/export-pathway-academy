import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String },
    phoneNumber: { type: String },
    password: {
      type: String,
      select: false,
    },
    emailAddress: { type: String, required: true, unique: true },
    country: { type: String },
    enrolledCourses: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        completedSessions: [
          { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
        ],
        totalSessions: { type: Number }, // Optional, for caching
        progress: { type: Number, default: 0 }, // Percent progress (0–100)
        isCompleted: { type: Boolean, default: false },
        startedAt: { type: Date },
        completedAt: { type: Date },
      },
    ],
    enrolledSessions: [
      {
        session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
        watchedDuration: { type: Number, default: 0 },
        isCompleted: { type: Boolean, default: false },
        lastWatchedAt: { type: Date },
        enrolledAt: { type: Date, default: Date.now }, // <-- Add this line
      },
    ],
    quizAttempts: [
      {
        quiz_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
          required: true,
        },
        status: {
          type: String,
          enum: ["passed", "failed", "not-attempted"],
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        attempts: {
          type: Number,
          default: 1,
        },
      },
    ],
    role: {
      type: String,
      enum: ["trainee", "admin"],
      default: "trainee",
    },
    profilePicture: {
      type: String,
      default: "https://example.com/default-profile.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
