import express from 'express';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getAllCourse,
} from '../controllers/courseControllers.js';

  

const router = express.Router();


router.post('/',    createCourse);
router.put('/:id',    updateCourse);
router.delete('/:id',    deleteCourse);


router.get('/:id',   getCourseById);
router.get('/',   getAllCourse);

export default router;
