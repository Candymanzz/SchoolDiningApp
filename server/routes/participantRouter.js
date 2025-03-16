// participantRouter.js
import { Router } from 'express';
const router = new Router();

import participantController from '../controllers/participantController.js'; // Используем ES модули
import authMiddleware from '../middleware/authMiddleware.js'; // Используем ES модули

router.post('/', authMiddleware, participantController.create);
router.delete('/:participant_id', participantController.delete);
router.get('/', participantController.getAll);

export default router; // Используем default export