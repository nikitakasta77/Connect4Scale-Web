/**
 * Every request gets flagged `req.isAdmin` (true only if a valid `x-api-key`
 * header was sent). Public GET routes use this to show published-only
 * content to visitors but everything to an authenticated admin tool.
 */
export function optionalAdmin(req, res, next) {
  const key = req.header('x-api-key');
  req.isAdmin = Boolean(key && process.env.ADMIN_API_KEY && key === process.env.ADMIN_API_KEY);
  next();
}

/** Hard gate for write endpoints — 401s unless optionalAdmin already verified the key. */
export function requireAdmin(req, res, next) {
  if (!req.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized — a valid x-api-key header is required.' });
  }
  next();
}
