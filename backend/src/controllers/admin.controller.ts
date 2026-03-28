import { Request, Response } from 'express';
import Registration from '../models/Registration.model';
import Team from '../models/Team.model';
import User from '../models/User.model';
import Otp from '../models/Otp.model';
import { sendAdminOTPEmail } from '../services/email.service';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const getRegistrations = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    
    let query: any = {};
    if (status) query.paymentStatus = status;

    const registrations = await Registration.find(query)
      .populate('userId', 'name email college phone')
      .populate('teamId', 'name memberDetails')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Registration.countDocuments(query);

    return res.json({
      success: true,
      data: registrations,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAnalytics = async (req: Request, res: Response): Promise<any> => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    const paidCount = await Registration.countDocuments({ paymentStatus: 'success' });
    const pendingCount = await Registration.countDocuments({ paymentStatus: 'pending' });
    const cancelledCount = await Registration.countDocuments({ paymentStatus: 'cancelled' });

    const conversionRate = totalRegistrations > 0 ? ((paidCount / totalRegistrations) * 100).toFixed(1) : '0.0';
    const totalRevenue = paidCount * env.HACKATHON_FEE;

    const users = await User.find({ role: 'participant' });
    const collegeMap: Record<string, number> = {};
    users.forEach(u => {
      const col = u.college || 'Unknown';
      collegeMap[col] = (collegeMap[col] || 0) + 1;
    });
    const collegeDistribution = Object.entries(collegeMap).map(([college, count]) => ({ college, count }));

    const teams = await Team.find();
    const teamCount = teams.length;
    const totalMembersInTeams = teams.reduce((acc, t) => acc + t.members.length, 0);
    const avgTeamSize = teamCount > 0 ? (totalMembersInTeams / teamCount).toFixed(1) : 0;
    const soloCount = teams.filter(t => t.members.length === 1).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const todayRegistrations = await Registration.countDocuments({ createdAt: { $gte: today } });
    const weekRegistrations = await Registration.countDocuments({ createdAt: { $gte: lastWeek } });

    return res.json({
      success: true,
      data: {
        totalRegistrations,
        paidCount,
        pendingCount,
        cancelledCount,
        conversionRate,
        totalRevenue,
        collegeDistribution,
        teamCount,
        avgTeamSize,
        soloCount,
        todayRegistrations,
        weekRegistrations
      }
    });

  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find().select('-__v');
    return res.json({ success: true, data: users });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<any> => {
  try {
    const adminUser = req.user.dbUser;
    if (adminUser.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Only superadmins can update global roles' });
    }

    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['participant', 'admin', 'moderator', 'judge'];
    if (!validRoles.includes(role)) return res.status(400).json({ success: false, error: 'Invalid evaluated role target' });

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ success: false, error: 'User target not located' });

    return res.json({ success: true, data: user });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllTeams = async (req: Request, res: Response): Promise<any> => {
  try {
    const teams = await Team.find().populate('members', 'name email college').populate('leaderId', 'name email');
    return res.json({ success: true, data: teams });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const ALLOWED_ADMINS = [
  '2311it010159@mallareddyuniversity.ac.in',
  '2311it010135@mallareddyuniversity.ac.in',
  '2311it010055@mallareddyuniversity.ac.in'
];

export const requestOtp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    
    if (!ALLOWED_ADMINS.includes(email)) {
      return res.status(403).json({ success: false, error: 'Unauthorized email target sequence.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    await sendAdminOTPEmail(email, otp);

    return res.json({ success: true, message: 'OTP logically routed successfully.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, otp } = req.body;
    
    if (!ALLOWED_ADMINS.includes(email)) {
      return res.status(403).json({ success: false, error: 'Unauthorized email target sequence.' });
    }

    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ success: false, error: 'Invalid or functionally expired OTP signature.' });
    }

    await Otp.deleteOne({ _id: record._id });

    // Explicitly use { id } since `authenticate.ts` looks for `decoded.id || decoded.userId`
    const token = jwt.sign(
      { id: 'SUPERADMIN_FIREWALL', email, role: 'admin' }, 
      env.JWT_SECRET as string,
      { expiresIn: '12h' }
    );

    res.cookie('admin_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000,
      path: '/'
    });

    return res.json({ success: true, token, email });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteRegistration = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration matrix not found.' });
    }

    // Explicit Database Cascade Deletion Map
    if (registration.teamId) {
      await Team.deleteOne({ _id: registration.teamId });
    }
    await User.deleteOne({ _id: registration.userId });
    await Registration.deleteOne({ _id: id });

    return res.json({ success: true, message: 'Execution Payload Complete: Registration indices systematically trashed.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
