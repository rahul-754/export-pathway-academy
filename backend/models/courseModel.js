import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortIntro: { type: String },
    courseDescription: { type: String },
    courseImg: { type: String },
    previewVideo: { type: String },
    tags: [String],
    category: { type: String },
    instructions: { type: String },
    setting: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },
    ratingScore: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      required: true,
    },
    learnings: [{ type: String, required: true }],
    pricing: {
      type: String,
      enum: ["free", "paid course", "paid certification"],
      required: true,
    },
    instructor: { type: String },
    duration: { type: Number, default: 0 },
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
    totalAmount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
