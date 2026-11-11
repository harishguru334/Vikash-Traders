import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    product: { type: String, default: '', trim: true, maxlength: 160 },
    message: { type: String, default: '', trim: true, maxlength: 2000 },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new', index: true },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', enquirySchema);
