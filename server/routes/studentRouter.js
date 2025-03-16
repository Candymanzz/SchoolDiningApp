// studentRouter.js
import { Router } from 'express';
const router = new Router();

import studentController from '../controllers/studentController.js'; // Используем ES модули
import authMiddleware from '../middleware/authMiddleware.js'; // Используем ES модули

router.post('/', authMiddleware, studentController.create);
router.delete('/:student_id', authMiddleware, studentController.delete);
router.get('/', studentController.getAll);
// router.get('/:student_id', studentController.getOne);

export default router; // Используем default export