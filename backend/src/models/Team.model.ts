import mongoose, { Schema, Document } from 'mongoose';

export interface IMemberDetail {
  name: string;
  email: string;
  phone?: string;
}

export interface ITeam extends Document {
  name: string;
  leaderId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  memberDetails: IMemberDetail[];
  inviteCode: string;
  projectName?: string;
  projectDescription?: string;
  maxSize: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name:               { type: String, required: true, unique: true, trim: true },
  leaderId:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members:            [{ type: Schema.Types.ObjectId, ref: 'User' }],
  memberDetails:      [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  }],
  inviteCode:         { type: String, unique: true, index: true },
  projectName:        { type: String, trim: true },
  projectDescription: { type: String },
  maxSize:            { type: Number, default: 4 },
}, { timestamps: true });

// Pre-save: generate invite code if missing
teamSchema.pre('save', function() {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2,8).toUpperCase();
  }
});

export default mongoose.model<ITeam>('Team', teamSchema);
