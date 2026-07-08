// Placeholder auth middleware.
// Once you set up real authentication (e.g. Supabase Auth or JWT),
// this will verify the incoming token and attach the user to req.user.

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No authorization token provided" });
  }

  // TODO: verify token (JWT or Supabase) and set req.user
  // For now this just passes through as a skeleton.
  next();
}

module.exports = { requireAuth };
