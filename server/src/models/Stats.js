import mongoose from 'mongoose';

// Singleton document (key: 'singleton') — matches the frontend's Stats
// section, which shows "—" for any figure that's still null instead of
// ever inventing a number.
const statsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'singleton', unique: true },
    projectsDelivered: { type: Number, default: null },
    brandsSupported: { type: Number, default: null },
    videosProduced: { type: Number, default: null },
    industriesServed: { type: Number, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('Stats', statsSchema);
