import express from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  removeEnrolledCourse,
  removeEnrolledSession,
  getCurrentUser,
  enrollInSessions,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", getCurrentUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.delete("/:userId/courses/:courseId", removeEnrolledCourse);
router.delete("/:userId/sessions/:sessionId", removeEnrolledSession);

router.post("/enroll/sessions", enrollInSessions);

export default router;
