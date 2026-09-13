import ContactSubmission from '../models/ContactSubmission.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Public — this is the live Contact form submission on the site. */
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, company, phone, service, project, budget, timeline, message } = req.body ?? {};

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!email || !EMAIL_PATTERN.test(String(email))) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }

  const submission = await ContactSubmission.create({
    name,
    email,
    company,
    phone,
    service,
    project,
    budget,
    timeline,
    message,
  });

  res.status(201).json({
    message: "Thanks — we'll be in touch shortly.",
    id: submission._id,
  });
});

/** Admin — paginated inbox of submissions, newest first, optionally filtered by status. */
export const listSubmissions = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const filter = status ? { status } : {};

  const [items, total] = await Promise.all([
    ContactSubmission.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    ContactSubmission.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
});

export const getSubmission = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.findById(req.params.id);
  if (!submission) return res.status(404).json({ error: 'Not found' });
  res.json(submission);
});

export const updateSubmissionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body ?? {};
  if (!['new', 'contacted', 'closed'].includes(status)) {
    return res.status(400).json({ error: 'status must be one of: new, contacted, closed.' });
  }
  const submission = await ContactSubmission.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!submission) return res.status(404).json({ error: 'Not found' });
  res.json(submission);
});

export const deleteSubmission = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
  if (!submission) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});
