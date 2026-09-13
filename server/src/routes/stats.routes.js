import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import { getStats, updateStats } from '../controllers/stats.controller.js';

const router = Router();

router.get('/', getStats);
router.put('/', requireAdmin, updateStats);

export default router;
