const express = require('express');
const router = express.Router();
const { 
  updateProgress, 
  getProgress, 
  getAllUserProgress 
} = require('../controllers/progress.controller');

router.put('/', updateProgress);
router.get('/:userId/:courseId', getProgress);
router.get('/user/:userId', getAllUserProgress);

module.exports = router;