import express from 'express';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getAllCourse,
} from '../controllers/courseControllers.js';

import authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', authMiddleware,  createCourse);
router.put('/:id', authMiddleware,  updateCourse);
router.delete('/:id', authMiddleware,  deleteCourse);


router.get('/:id', authMiddleware, getCourseById);
router.get('/', authMiddleware, getAllCourse);

export default router;
