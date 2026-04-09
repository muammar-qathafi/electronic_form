const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// In-memory storage (for demonstration purposes)
// In production, use a real database
let users = [
  {
    id: 'demo-user-1',
    username: 'demo',
    email: 'demo@example.com',
    password: '$2a$10$YourHashedPasswordHere', // "password123" hashed
    fullName: 'Demo User',
    createdAt: new Date().toISOString()
  }
];

class UserController {
  // Register a new user
  async register(req, res) {
    try {
      const { username, email, password, fullName } = req.body;
      
      // Validation
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username, email, and password are required'
        });
      }
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email || u.username === username);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'User with this email or username already exists'
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        fullName: fullName || username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      users.push(user);
      
      // Generate token
      const token = this._generateToken(user);
      
      // Remove password from response
      const userResponse = { ...user };
      delete userResponse.password;
      
      res.status(201).json({
        success: true,
        data: {
          user: userResponse,
          token
        },
        message: 'User registered successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }
      
      // Find user
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      
      // Generate token
      const token = this._generateToken(user);
      
      // Remove password from response
      const userResponse = { ...user };
      delete userResponse.password;
      
      res.json({
        success: true,
        data: {
          user: userResponse,
          token
        },
        message: 'Login successful'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get user profile
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      
      const user = users.find(u => u.id === userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      // Remove password from response
      const userResponse = { ...user };
      delete userResponse.password;
      
      res.json({
        success: true,
        data: userResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { fullName, email } = req.body;
      
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      // Check if email is already taken by another user
      if (email && email !== users[userIndex].email) {
        const emailExists = users.find(u => u.email === email && u.id !== userId);
        if (emailExists) {
          return res.status(409).json({
            success: false,
            error: 'Email already in use'
          });
        }
        users[userIndex].email = email;
      }
      
      if (fullName) {
        users[userIndex].fullName = fullName;
      }
      
      users[userIndex].updatedAt = new Date().toISOString();
      
      // Remove password from response
      const userResponse = { ...users[userIndex] };
      delete userResponse.password;
      
      res.json({
        success: true,
        data: userResponse,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Logout user
  async logout(req, res) {
    try {
      // In a real application, you might want to blacklist the token
      // or clear it from a session store
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Private helper method to generate JWT token
  _generateToken(user) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET || 'default-secret-key', {
      expiresIn: '7d'
    });
  }
}

module.exports = new UserController();
