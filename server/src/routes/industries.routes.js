import { Router } from 'express';
import Industry from '../models/Industry.js';
import { createCrudController } from '../controllers/crudFactory.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();
const ctrl = createCrudController(Industry);

router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.post('/', requireAdmin, ctrl.create);
router.put('/:id', requireAdmin, ctrl.update);
router.delete('/:id', requireAdmin, ctrl.remove);

export default router;
