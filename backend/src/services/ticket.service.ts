import qrcode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';
import Ticket from '../models/Ticket.model';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const generateQRTicket = async (userId: string, registrationId: string) => {
  const qrData = `HACKFLOW-${userId}-${Date.now()}`;
  
  // Directly bind lightweight generic QR parameters dropping heavy Cloudinary buffers natively
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrData}`;

  const ticket = new Ticket({
    userId,
    registrationId,
    qrCode: qrData,
    qrCodeImageUrl
  });

  await ticket.save();
  return ticket;
};
