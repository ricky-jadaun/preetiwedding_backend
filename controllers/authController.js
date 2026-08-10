const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

// Generate JWT token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_jwt_secret_key_12345', {
    expiresIn: '24h'
  });
};

// @desc    Auth admin user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for user
    const user = await AdminUser.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify current token
// @route   GET /api/auth/verify
// @access  Protected
const verify = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username
    }
  });
};

module.exports = {
  login,
  verify
};
