import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Builds standard list/get/create/update/delete handlers for a simple
 * content model (Project, Service, Industry, Client). Visitors (no admin
 * key) only ever see published items; an authenticated admin sees everything.
 */
export function createCrudController(Model) {
  return {
    list: asyncHandler(async (req, res) => {
      const filter = req.isAdmin ? {} : { isPublished: true };
      const items = await Model.find(filter).sort({ order: 1, createdAt: 1 });
      res.json(items);
    }),

    getOne: asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item || (!req.isAdmin && !item.isPublished)) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.json(item);
    }),

    create: asyncHandler(async (req, res) => {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    }),

    update: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    }),

    remove: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.status(204).end();
    }),
  };
}
