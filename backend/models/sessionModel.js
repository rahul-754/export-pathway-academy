import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    previewVideo: { type: String },
    sessionImage: { type: String },
    videoUrl: { type: String },
    description: { type: String },
    duration: { type: Number, default: 0 },
    learnings: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },
    ppt: { type: String },
    notes: { type: String },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quizes" },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
