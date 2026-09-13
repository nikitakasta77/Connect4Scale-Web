import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    icon: { type: String, trim: true, default: 'grid' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Industry', industrySchema);
