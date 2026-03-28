import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  userId: mongoose.Types.ObjectId;
  registrationId: mongoose.Types.ObjectId;
  qrCode: string;
  qrCodeImageUrl?: string;
  scanned: boolean;
  scannedAt?: Date;
  scannedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new Schema<ITicket>({
  userId:         { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  registrationId: { type: Schema.Types.ObjectId, ref: 'Registration', required: true },
  qrCode:         { type: String, required: true, unique: true },
  qrCodeImageUrl: { type: String },
  scanned:        { type: Boolean, default: false },
  scannedAt:      { type: Date },
  scannedBy:      { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model<ITicket>('Ticket', ticketSchema);
