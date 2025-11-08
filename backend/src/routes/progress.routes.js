const express = require('express');
const router = express.Router();
const { 
  updateProgress, 
  getProgress, 
  getAllUserProgress 
} = require('../controllers/progress.controller');

// PUT /api/progress - Update progress
router.put('/', updateProgress);

// GET /api/progress/:userId/:courseId - Get specific progress
router.get('/:userId/:courseId', getProgress);

// GET /api/progress/user/:userId - Get all user progress
router.get('/user/:userId', getAllUserProgress);

module.exports = router;