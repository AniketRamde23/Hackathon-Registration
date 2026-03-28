import mongoose, { Document, Schema } from 'mongoose';

export interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  email: { 
    type: String, 
    required: true,
    index: true 
  },
  otp: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 300 // MongoDB natively destroys document exactly after 300 seconds (5 Mins)
  }
});

export default mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema);
