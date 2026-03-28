import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firebaseUid: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  skills?: string[];
  role: 'participant' | 'admin' | 'moderator' | 'judge';
  avatarUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  firebaseUid:  { type: String, required: true, unique: true, index: true },
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true },
  phone:        { type: String },
  college:      { type: String, trim: true },
  skills:       [{ type: String }],
  role:         { type: String, enum: ['participant','admin','moderator','judge'], default: 'participant' },
  avatarUrl:    { type: String },
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Cascade deletions handling Edge-Cases safely
userSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const userId = doc._id;
    await mongoose.model('Team').deleteMany({ leaderId: userId });
    await mongoose.model('Team').updateMany({}, { $pull: { members: userId } });
    await mongoose.model('Registration').deleteMany({ userId });
    await mongoose.model('Score').deleteMany({ judgeId: userId });
  }
});

export default mongoose.model<IUser>('User', userSchema);
