import mongoose, { Schema, Document } from 'mongoose';

export interface IScore extends Document {
  judgeId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  innovation: number;
  technicalComplexity: number;
  uiux: number;
  presentation: number;
  impact: number;
  totalScore: number;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}

const scoreSchema = new Schema<IScore>({
  judgeId:             { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId:              { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  innovation:          { type: Number, min: 0, max: 20, required: true },
  technicalComplexity: { type: Number, min: 0, max: 20, required: true },
  uiux:                { type: Number, min: 0, max: 20, required: true },
  presentation:        { type: Number, min: 0, max: 20, required: true },
  impact:              { type: Number, min: 0, max: 20, required: true },
  totalScore:          { type: Number },
  comments:            { type: String, maxlength: 500 },
}, { timestamps: true });

scoreSchema.index({ judgeId: 1, teamId: 1 }, { unique: true }); // ONE score per judge per team

scoreSchema.pre('save', function() {
  this.totalScore = this.innovation + this.technicalComplexity + this.uiux + this.presentation + this.impact;
});

export default mongoose.model<IScore>('Score', scoreSchema);
