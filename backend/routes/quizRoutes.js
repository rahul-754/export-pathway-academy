import express from "express";
import {
  getQuizesBySessionId,
  createQuiz,
  updateQuiz,
} from "../controllers/quizControllers.js";

const router = express.Router();

router.patch("/", updateQuiz);
router.get("/", getQuizesBySessionId);
router.post("/", createQuiz);

export default router;
