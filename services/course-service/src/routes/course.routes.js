const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById, createCourse } = require('../controllers/course.controller');

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);

module.exports = router;