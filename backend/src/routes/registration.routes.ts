import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { createRegistration, getMyRegistration, cancelRegistration } from '../controllers/registration.controller';

const router = Router();

router.post('/', authenticate, createRegistration);
router.get('/me', authenticate, getMyRegistration);
router.delete('/:id', authenticate, cancelRegistration);

export default router;
