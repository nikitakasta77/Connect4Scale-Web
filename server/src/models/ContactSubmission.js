import mongoose from 'mongoose';

const SERVICE_OPTIONS = [
  'Corporate Film',
  'Brand Film',
  'Product Video',
  'Social Media Content',
  'Event Coverage',
  'Motion Graphics',
  'Training / Explainer Video',
  'Digital Marketing Creatives',
  'Other',
];

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    company: { type: String, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40 },
    service: { type: String, trim: true, enum: [...SERVICE_OPTIONS, ''] },
    project: { type: String, trim: true, maxlength: 2000 },
    budget: { type: String, trim: true, maxlength: 60 },
    timeline: { type: String, trim: true, maxlength: 60 },
    message: { type: String, trim: true, maxlength: 4000 },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

export const SERVICE_ENUM = SERVICE_OPTIONS;
export default mongoose.model('ContactSubmission', contactSubmissionSchema);
