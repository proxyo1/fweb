import jwt from 'jsonwebtoken';

export const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // No token found in cookies, clear the cookie and redirect
    res.clearCookie("token");
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    // Verify the token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Proceed to the next middleware
  } catch (err) {
    // Token verification failed, clear the cookie and redirect
    res.clearCookie("token");
    return res.status(400).send("Invalid token.");
  }
};

