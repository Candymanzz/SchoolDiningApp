// employeeRouter.js
import { Router } from 'express';
const router = new Router();

import employeeController from '../controllers/employeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.get('/', employeeController.getAll);
router.post('/registration', authMiddleware, employeeController.registration);
router.post('/login', employeeController.login);
router.get('/auth', authMiddleware, employeeController.check);
router.delete('/:employee_id', authMiddleware, employeeController.delete);

export default router; // Используем default export