const express = require('express');
const router = express.Router();
const { 
  enrollCourse, 
  getUserEnrollments, 
  checkEnrollment 
} = require('../controllers/enrollment.controller');

// POST /api/enrollments - Enroll to a course
router.post('/', enrollCourse);

// GET /api/enrollments/user/:userId - Get user enrollments
router.get('/user/:userId', getUserEnrollments);

// GET /api/enrollments/check/:userId/:courseId - Check enrollment status
router.get('/check/:userId/:courseId', checkEnrollment);

module.exports = router;