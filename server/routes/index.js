// ./routes/index.js
import { Router } from 'express';
const router = new Router();

import employeeRouter from './employeeRouter.js';
import classRouter from './classRouter.js';
import studentRouter from './studentRouter.js';
import attendanceRouter from './attendanceRouter.js';
import nutritionRouter from './nutritionRouter.js';
import participantRouter from './participantRouter.js';
import preferenceRouter from './preferenceRouter.js';
import createAndDownloadAttendPdf from '../documents/attendpdf.js';

router.use('/employee', employeeRouter);
router.use('/class', classRouter);
router.use('/student', studentRouter);
router.use('/attendance', attendanceRouter);
router.use('/nutrition', nutritionRouter);
router.use('/participant', participantRouter);
router.use('/preference', preferenceRouter);
router.post('/pdf', createAndDownloadAttendPdf);

export default router; // Используем default export