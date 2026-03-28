import { Request, Response } from 'express';
import Ticket from '../models/Ticket.model';

export const getMyTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    const ticket = await Ticket.findOne({ userId: user._id }).populate('registrationId');
    
    if (!ticket) return res.status(404).json({ success: false, error: 'Verified physical ticket not located' });
    
    return res.json({ success: true, data: ticket });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { qrCode } = req.params;
    const ticket = await Ticket.findOne({ qrCode }).populate({
      path: 'userId',
      select: 'name college email'
    });

    if (!ticket) return res.status(404).json({ status: 'invalid' });
    
    return res.json({ status: ticket.scanned ? 'already_scanned' : 'valid', data: ticket });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const scanTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { qrCode } = req.params;
    const adminUser = req.user.dbUser;

    const ticket: any = await Ticket.findOne({ qrCode }).populate('userId', 'name college');
    
    if (!ticket) return res.status(404).json({ status: 'invalid' });
    
    if (ticket.scanned) {
      return res.json({ status: 'already_scanned', scannedAt: ticket.scannedAt });
    }

    ticket.scanned = true;
    ticket.scannedAt = new Date();
    ticket.scannedBy = adminUser._id;
    await ticket.save();

    // Trigger physical event web-socket alert cleanly dynamically
    const io = req.app.get('io');
    if (io) {
      io.emit('ticket:scanned', { ticketId: ticket._id.toString(), userId: ticket.userId._id.toString() });
    }

    return res.json({
      status: 'success',
      user: {
        name: ticket.userId.name,
        college: ticket.userId.college
      }
    });

  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
