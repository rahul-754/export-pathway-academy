import express from "express";
import {
  getQuizesBySessionId,
  createQuiz,
  updateQuiz,
} from "../controllers/quizControllers.js";

const router = express.Router();

router.get("/", getQuizesBySessionId);
router.post("/", createQuiz);
router.patch("/", updateQuiz);

export default router;
