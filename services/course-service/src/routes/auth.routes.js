const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../../../../services/course-service/src/controllers/auth.controller');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me/:userId
router.get('/me/:userId', getMe);

module.exports = router;