// attendanceRouter.js
import { Router } from 'express';
const router = new Router();

import attendanceController from '../controllers/attendanceController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/', authMiddleware, attendanceController.create);
router.post('/pdf', authMiddleware, attendanceController.createPdf);
router.get('/pdf', authMiddleware, attendanceController.getPdf);
router.delete('/:attendance_id', authMiddleware, attendanceController.delete);
router.get('/', attendanceController.getAll);

export default router; // Используем default export