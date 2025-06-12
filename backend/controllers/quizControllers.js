import { Types } from "mongoose";
import Quiz from "../models/quizModel.js";
import Session from "../models/sessionModel.js";

export const getQuizesBySessionId = async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    const quiz = await Quiz.findById(session.quiz);

    res.status(200).json({ quiz });
  } catch (e) {
    console.error("Error fetching quizzes by sessionId:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createQuiz = async (req, res) => {
  const { quiz, sessionId } = req.body;
  try {
    const quizWithId = { ...quiz, _id: new Types.ObjectId() };
    const newQuiz = new Quiz(quizWithId);
    await newQuiz.save();
    await Session.findByIdAndUpdate(sessionId, {
      $set: { quiz: quizWithId._id },
    });
    res.send({
      message: "Quiz created successfully",
      _id: quizWithId._id,
    });
  } catch (e) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const updateQuiz = async (req, res) => {
  const { quiz } = req.body;
  if (!quiz || !quiz._id) {
    return res.status(400).json({ error: "Quiz or quiz ID is missing" });
  }
  try {
    await Quiz.findOneAndReplace({ _id: quiz._id }, quiz, { new: true });
    res.send({
      message: "Updated successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};
