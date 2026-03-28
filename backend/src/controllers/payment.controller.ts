import { Request, Response } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Registration from '../models/Registration.model';
import User from '../models/User.model';
import { env } from '../config/env';
import { generateQRTicket } from '../services/ticket.service';
import { sendPaymentSuccessEmail } from '../services/email.service';

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    
    const registration = await Registration.findOne({ userId: user._id, paymentStatus: 'pending' });
    if (!registration) {
      return res.status(404).json({ success: false, error: 'No pending registration found for this user' });
    }

    if (registration.paymentStatus === 'success') {
      return res.status(400).json({ success: false, error: 'Registration is already paid' });
    }

    const order = await razorpay.orders.create({
      amount: env.HACKATHON_FEE * 100, // Handle internally as paise units
      currency: 'INR',
      receipt: `hackflow_${registration._id}`,
      notes: { userId: user._id.toString(), registrationId: registration._id.toString() },
    });

    registration.razorpayOrderId = order.id;
    await registration.save();

    return res.json({ 
      success: true, 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency, 
      keyId: env.RAZORPAY_KEY_ID 
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const registration = await Registration.findOne({ userId: user._id, razorpayOrderId });
    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration or specific order not found.' });
    }

    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSig = crypto.createHmac('sha256', env.RAZORPAY_KEY_SECRET).update(body).digest('hex');

    if (expectedSig !== razorpaySignature) {
      return res.status(400).json({ success: false, error: 'Invalid payment signature logic' });
    }

    // Double-check idempotency gracefully
    if (registration.paymentStatus === 'success') {
      return res.json({ success: true, message: 'Already verified previously over webhook' });
    }

    registration.paymentStatus = 'success';
    registration.paymentId = razorpayPaymentId;
    await registration.save();

    const ticket = await generateQRTicket(user._id.toString(), registration._id.toString());
    await sendPaymentSuccessEmail(user, ticket, ticket.qrCodeImageUrl as string);

    // Blast socket success emitter dynamically if configured over index.ts HTTP wrapper
    const io = req.app.get('io');
    if (io) {
      io.emit('payment:success', { userId: user._id.toString() });
    }

    return res.json({ success: true, ticket });
  } catch (error: any) {
    console.error('Error verifying payment externally:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const bypassPayment = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    const registration = await Registration.findOne({ userId: user._id, paymentStatus: 'pending' }).populate('teamId');
    
    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration not found or already processed' });
    }

    registration.paymentStatus = 'success';
    registration.paymentId = 'BYPASS_' + Date.now();
    await registration.save();

    const ticket = await generateQRTicket(user._id.toString(), registration._id.toString());
    
    // Inject nodeMailer dispatch visually sending the populated team
    await sendPaymentSuccessEmail(user, ticket, ticket.qrCodeImageUrl as string, registration.teamId);

    return res.json({ success: true, ticket });
  } catch (error: any) {
    console.error('Error bypassing payment:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const razorpayWebhook = async (req: Request, res: Response): Promise<any> => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const secret = env.RAZORPAY_WEBHOOK_SECRET;

    // Notice we re-hydrate raw string blocks using deep JSON parse logic validation
    const expectedSig = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');

    if (expectedSig !== signature) {
      return res.status(400).json({ success: false, error: 'Invalid webhook injection signature' });
    }

    const event = req.body.event;
    if (event === 'payment.captured') {
      const payment = req.body.payload.payment.entity;
      const notes = payment.notes;
      const { userId, registrationId } = notes;

      const registration = await Registration.findById(registrationId);
      if (!registration || registration.paymentStatus === 'success') {
        return res.status(200).json({ success: true, message: 'Already verified locally over client' });
      }

      registration.paymentStatus = 'success';
      registration.paymentId = payment.id;
      await registration.save();

      const user = await User.findById(userId);
      if (user) {
        const ticket = await generateQRTicket(userId, registrationId);
        await sendPaymentSuccessEmail(user, ticket, ticket.qrCodeImageUrl as string);

        const io = req.app.get('io');
        if (io) io.emit('payment:success', { userId });
      }
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
