export function notFound(req, res) {
  res.status(404).json({ error: `Not found — ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: Object.values(err.errors).map((e) => e.message).join(' ') });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid id.' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate value.' });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server error.' });
}
