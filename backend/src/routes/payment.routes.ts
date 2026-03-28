import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { createOrder, verifyPayment, razorpayWebhook, bypassPayment } from '../controllers/payment.controller';

const router = Router();

router.post('/create-order', authenticate, createOrder);
router.post('/verify', authenticate, verifyPayment);
router.post('/bypass', authenticate, bypassPayment);

// Standard Webhook logic strictly depends on signature bindings so explicit Auth routing applies raw logic
router.post('/webhook', razorpayWebhook);

export default router;
