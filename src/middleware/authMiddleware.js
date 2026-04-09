const jwt = require('jsonwebtoken');

class AuthMiddleware {
  // Authenticate user using JWT token
  authenticate(req, res, next) {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'Authentication token required'
        });
      }
      
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
      
      // Attach user info to request
      req.user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email
      };
      
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          error: 'Invalid token'
        });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Token expired'
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Authentication failed'
      });
    }
  }

  // Optional authentication (doesn't fail if no token)
  optionalAuth(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
        
        req.user = {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email
        };
      }
      
      next();
    } catch (error) {
      // Continue without authentication
      next();
    }
  }
}

module.exports = new AuthMiddleware();
