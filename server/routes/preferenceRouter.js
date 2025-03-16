// preferenceRouter.js
import { Router } from 'express';
const router = new Router();

import preferenceController from '../controllers/preferenceController.js'; // Используем ES модули
import authMiddleware from '../middleware/authMiddleware.js'; // Используем ES модули

router.post('/', authMiddleware, preferenceController.create);
router.delete('/:preference_id', authMiddleware, preferenceController.delete);
router.get('/', preferenceController.getAll);

export default router; // Используем default export