import jwt from "jsonwebtoken";

// Authentication middleware to check if the user is logged in
export const verifyUser = (req, res, next) => {
  console.log("req.cookies", req.cookies);
  const token = req.cookies.token;
  if (!token) {
    // If no token is provided, return a 401 Unauthorized error
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verifying the token and extracting the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // If token verification fails , return a 400 Bad Request error with details
    res.status(400).json({ message: "Invalid token.", error: err.message });
  }
};
