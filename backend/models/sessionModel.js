import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    previewVideo: { type: String },
    sessionImage: { type: String },
    videoUrl: { type: String },
    description: { type: String },
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },
    ppt: { type: String },
    notes: { type: String },
    quiz: {
      type: String,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
