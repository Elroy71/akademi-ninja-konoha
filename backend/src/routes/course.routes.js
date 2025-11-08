const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById, createCourse } = require('../controllers/course.controller');

// GET /api/courses - Get all courses
router.get('/', getAllCourses);

// GET /api/courses/:id - Get course by ID
router.get('/:id', getCourseById);

// POST /api/courses - Create new course (admin)
router.post('/', createCourse);

module.exports = router;