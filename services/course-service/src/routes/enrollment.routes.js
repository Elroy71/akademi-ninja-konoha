const express = require('express');
const router = express.Router();
const { 
  enrollCourse, 
  getUserEnrollments, 
  checkEnrollment 
} = require('../controllers/enrollment.controller');

router.post('/', enrollCourse);
router.get('/user/:userId', getUserEnrollments);
router.get('/check/:userId/:courseId', checkEnrollment);

module.exports = router;