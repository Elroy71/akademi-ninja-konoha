const express = require('express');
const router = express.Router();

const courseRoutes = require('./course.routes');
const enrollmentRoutes = require('./enrollment.routes');
const progressRoutes = require('./progress.routes');
const certificateRoutes = require('./certificate.routes');

router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/progress', progressRoutes);
router.use('/certificates', certificateRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 200,
    service: 'course-service',
    message: 'Course Service is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;