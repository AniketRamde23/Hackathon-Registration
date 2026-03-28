import { Request, Response } from 'express';
import Registration from '../models/Registration.model';
import { sendRegistrationConfirmationEmail } from '../services/email.service';

export const createRegistration = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    const { name, phone, college, yearOfStudy, skills, linkedIn } = req.body;
    
    const existing = await Registration.findOne({ userId: user._id, paymentStatus: { $ne: 'cancelled' } });
    if (existing) {
      if (existing.paymentStatus === 'pending') {
        // IDEMPOTENT: Silently return the existing wrapper allowing Razorpay to spawn on retries!
        return res.status(200).json({ success: true, data: existing });
      }
      return res.status(400).json({ success: false, error: 'Active registration already exists' });
    }

    // Save extended Profile Metadata
    user.name = name;
    user.phone = phone;
    user.college = college;
    user.yearOfStudy = yearOfStudy;
    user.skills = skills ? skills.split(',').map((s: string) => s.trim()) : [];
    if (linkedIn) user.linkedIn = linkedIn;
    await user.save();

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const registration = new Registration({
      userId: user._id,
      paymentStatus: 'pending',
      amount: 499,
      expiresAt
    });

    await registration.save();
    
    // Send background email securely
    await sendRegistrationConfirmationEmail(user, registration._id.toString());

    return res.status(201).json({ success: true, data: registration });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMyRegistration = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    const registration = await Registration.findOne({ userId: user._id }).populate('teamId');
    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }
    
    return res.json({ success: true, data: registration });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const cancelRegistration = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    const { id } = req.params;
    
    const registration = await Registration.findOne({ _id: id, userId: user._id });
    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }

    if (registration.paymentStatus === 'success') {
      return res.status(400).json({ success: false, error: 'Cannot cancel paid registration' });
    }

    registration.paymentStatus = 'cancelled';
    registration.cancelledAt = new Date();
    await registration.save();

    return res.json({ success: true, message: 'Registration cancelled successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
