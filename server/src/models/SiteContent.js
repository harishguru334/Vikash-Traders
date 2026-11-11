import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
    updatedBy: { type: String, default: 'Admin' },
  },
  { timestamps: true }
);

export default mongoose.model('SiteContent', siteContentSchema);
