import express from "express";
import {
  createSession,
  updateSession,
  deleteSession,
  getSessionById,
  getAllSessions,
  getSessionsByCourse,
} from "../controllers/sessionControllers.js";

const router = express.Router();

router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);
router.get("/:id", getSessionById);
router.get("/", getAllSessions);
router.get("/course/:courseId", getSessionsByCourse);

export default router;
