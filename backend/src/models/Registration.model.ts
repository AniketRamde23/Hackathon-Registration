import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  paymentStatus: 'pending' | 'success' | 'failed' | 'cancelled';
  paymentId?: string;
  razorpayOrderId?: string;
  amount?: number;
  expiresAt: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<IRegistration>({
  userId:          { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  teamId:          { type: Schema.Types.ObjectId, ref: 'Team' },
  paymentStatus:   { type: String, enum: ['pending','success','failed','cancelled'], default: 'pending' },
  paymentId:       { type: String },
  razorpayOrderId: { type: String },
  amount:          { type: Number },
  expiresAt:       { type: Date, required: true },  // now + 24h
  cancelledAt:     { type: Date },
}, { timestamps: true });

registrationSchema.index({ userId: 1 });
registrationSchema.index({ paymentStatus: 1 });
registrationSchema.index({ expiresAt: 1 });  // for cron job query

export default mongoose.model<IRegistration>('Registration', registrationSchema);
