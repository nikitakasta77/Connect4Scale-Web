import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requireAdmin } from '../middleware/auth.js';
import {
  submitContact,
  listSubmissions,
  getSubmission,
  updateSubmissionStatus,
  deleteSubmission,
} from '../controllers/contact.controller.js';

const router = Router();

// Throttle the public endpoint — it's the one route on this API anyone on
// the internet can call without a key, so it's the one spam/abuse target.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this IP — please try again later.' },
});

router.post('/', contactLimiter, submitContact);

router.get('/', requireAdmin, listSubmissions);
router.get('/:id', requireAdmin, getSubmission);
router.patch('/:id', requireAdmin, updateSubmissionStatus);
router.delete('/:id', requireAdmin, deleteSubmission);

export default router;
