import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authenticate';
import { getMyTicket, verifyTicket, scanTicket } from '../controllers/ticket.controller';

const router = Router();

router.get('/me', authenticate, getMyTicket);
router.get('/:qrCode/verify', authenticate, requireRole(['admin', 'moderator']), verifyTicket);
router.post('/:qrCode/scan', authenticate, requireRole(['admin', 'moderator']), scanTicket);

export default router;
