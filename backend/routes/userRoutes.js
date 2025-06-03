  import express from 'express';
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
  } from '../controllers/userControllers.js';
  import authMiddleware from '../middleware/authMiddleware.js'; 


  const router = express.Router();

  router.post('/register', registerUser);
  router.post('/login', loginUser);

  router.get('/me', authMiddleware, getCurrentUser);
  router.get('/', authMiddleware, getAllUsers);
  router.get('/:id', authMiddleware, getUserById);
  router.put('/:id', authMiddleware, updateUser);
  router.delete('/:id', authMiddleware, deleteUser);


  router.delete('/:userId/courses/:courseId', authMiddleware, removeEnrolledCourse);
  router.delete('/:userId/sessions/:sessionId', authMiddleware, removeEnrolledSession);

  export default router;
