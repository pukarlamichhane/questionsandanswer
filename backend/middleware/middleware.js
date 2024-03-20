const jwt = require('jsonwebtoken');

// Middleware to check user role before accessing routes
const checkRole = (role) => (req, res, next) => {
  const token = req.cookies.token; // Access token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    if (decoded.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  });
};

module.exports= { checkRole };
