const express = require('express');
const router = express.Router();

// Import all routes
const authRoutes = require('./auth.routes');
const courseRoutes = require('./course.routes');
const enrollmentRoutes = require('./enrollment.routes');
const progressRoutes = require('./progress.routes');
const certificateRoutes = require('./certificate.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/progress', progressRoutes);
router.use('/certificates', certificateRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 200,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;