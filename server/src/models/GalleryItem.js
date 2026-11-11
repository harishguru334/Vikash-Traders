import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    caption: { type: String, trim: true, default: '' },
    image: { type: String, required: true },
    tag: { type: String, default: 'Installation' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('GalleryItem', galleryItemSchema);
