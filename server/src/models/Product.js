import mongoose from 'mongoose';

export const CATEGORIES = [
  'Road Safety Equipment (ROADNEX™)',
  'Plastic Dust Bins',
  'Cleaning Machines',
  'Queue Stands',
  'Scrubbing & Polishing Machine',
];

const productSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: '', trim: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ sortOrder: 1, createdAt: 1 });

export default mongoose.model('Product', productSchema);
