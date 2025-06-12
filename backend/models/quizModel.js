import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    maxAttempts: { type: Number, required: true },
    duration: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    passingMarks: { type: Number, required: true },
    settings: {
      type: {
        showAnswers: { type: Boolean, required: true },
        shuffleQuestions: { type: Boolean, required: true },
      },
      required: true,
    },
    questions: {
      type: [
        {
          question: { type: String, required: true },
          marks: { type: Number, required: true },
          type: { type: String, required: true },
          choices: { type: [String], required: true },
          correctAnswers: { type: [Number], required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quizes", quizSchema);
export default Quiz;
