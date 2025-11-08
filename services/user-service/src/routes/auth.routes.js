const express = require('express');
const router = express.Router();
const { register, login, getUserById, getAllUsers } = require('../controllers/auth.controller');

// Auth endpoints
router.post('/register', register);
router.post('/login', login);

// User endpoints
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);

module.exports = router;