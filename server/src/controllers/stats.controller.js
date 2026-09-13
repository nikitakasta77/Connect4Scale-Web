import Stats from '../models/Stats.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const FIELDS = ['projectsDelivered', 'brandsSupported', 'videosProduced', 'industriesServed'];

export const getStats = asyncHandler(async (req, res) => {
  const stats = await Stats.findOneAndUpdate(
    { key: 'singleton' },
    { $setOnInsert: { key: 'singleton' } },
    { upsert: true, new: true }
  );
  res.json(stats);
});

export const updateStats = asyncHandler(async (req, res) => {
  const body = req.body ?? {};
  const update = {};
  for (const field of FIELDS) {
    if (field in body) {
      update[field] = body[field] === null || body[field] === '' ? null : Number(body[field]);
    }
  }

  const stats = await Stats.findOneAndUpdate(
    { key: 'singleton' },
    { $set: update, $setOnInsert: { key: 'singleton' } },
    { upsert: true, new: true, runValidators: true }
  );
  res.json(stats);
});
