import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    passwordHash: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['Super Admin', 'Content Admin'], 
      default: 'Super Admin' 
    },
    isActive: { type: Boolean, default: true },
    lastActiveAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('AdminUser', adminUserSchema);
