const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');

// Mount routes
router.use('/auth', authRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 200,
    service: 'user-service',
    message: 'User Service is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;