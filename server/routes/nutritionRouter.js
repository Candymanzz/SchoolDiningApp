// nutritionRouter.js
import { Router } from 'express';
const router = new Router();

import nutritionController from '../controllers/nutritionController.js'; // Используем ES модули
import authMiddleware from '../middleware/authMiddleware.js'; // Используем ES модули

router.post('/', authMiddleware, nutritionController.create);
router.post('/pdf', authMiddleware, nutritionController.createPdf);
router.get('/pdf', authMiddleware, nutritionController.getPdf);
router.delete('/:nutrition_id', authMiddleware, nutritionController.delete);
router.get('/', nutritionController.getAll);
// router.get('/:nutrition_id', nutritionController.getOne);

export default router; // Используем default export