import express from "express";
import {
  getQuizesBySessionId,
  createQuiz,
  updateQuiz,
  submitQuizAttempt,
} from "../controllers/quizControllers.js";


const router = express.Router();

router.patch("/", updateQuiz);
router.get("/", getQuizesBySessionId);
router.post("/", createQuiz);
router.post("/attempt", submitQuizAttempt);


export default router;
