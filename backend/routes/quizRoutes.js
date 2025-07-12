import express from "express";
import {
  getQuizesBySessionId,
  createQuiz,
  submitQuizAttempt,
  updateQuiz,
  checkAllQuizzesPassed,
} from "../controllers/quizControllers.js";


const router = express.Router();

router.patch("/", updateQuiz);
router.get("/", getQuizesBySessionId);
router.post("/", createQuiz);
router.post("/submit-attempt", submitQuizAttempt);
router.get("/check-all-passed", checkAllQuizzesPassed);


export default router;
