// Authorization middleware to check if the user is authorized based on their role
export const authorizeRole = (roles) => (req, res, next) => {
  // Check if the user's role is included in the allowed roles
  if (!roles.includes(req.user.role)) {
    // If not, return a 403 Forbidden response
    return res
      .status(403)
      .json({ message: "Access forbidden: insufficient permissions." });
  }
  // If the user's role is authorized, proceed to the next middleware or route handler
  next();
};
