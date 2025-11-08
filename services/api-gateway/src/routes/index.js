const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');

// Mount routes
router.use(userRoutes);
router.use(courseRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 200,
    service: 'api-gateway',
    message: 'API Gateway is running',
    services: {
      userService: process.env.USER_SERVICE_URL,
      courseService: process.env.COURSE_SERVICE_URL
    },
    timestamp: new Date().toISOString()
  });
});

module.exports = router;