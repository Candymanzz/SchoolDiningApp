// classRouter.js
import { Router } from 'express';
const router = new Router();

import classController from '../controllers/classController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/', authMiddleware, classController.create);
router.delete('/:class_id', authMiddleware, classController.delete);
router.get('/', classController.getAll);

export default router; // Используем default export