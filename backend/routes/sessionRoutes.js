import express from 'express';
import {
  createSession,
  updateSession,
  deleteSession,
  getSessionById,
  getAllSessions,
  getSessionsByCourse
} from '../controllers/sessionControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createSession);
router.put('/:id', authMiddleware, updateSession);
router.delete('/:id', authMiddleware, deleteSession);
router.get('/:id', authMiddleware, getSessionById);
router.get('/', authMiddleware, getAllSessions);
router.get('/course/:courseId', authMiddleware, getSessionsByCourse);

export default router;