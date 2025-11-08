const express = require('express');
const router = express.Router();
const { userServiceProxy } = require('../utils/serviceProxy');

/**
 * Forward all /auth/* requests to User Service
 * FIXED: Add /api prefix when forwarding
 */
router.all('/auth/*', async (req, res, next) => {
  try {
    // Extract path after /api (e.g., /api/auth/login -> /auth/login)
    const apiPath = req.originalUrl.replace('/api', '');
    
    // Add /api prefix for User Service
    const targetPath = `/api${apiPath}`;
    
    console.log(`[GATEWAY] Forwarding ${req.method} to User Service: ${targetPath}`);
    
    const result = await userServiceProxy.forward(
      req.method,
      targetPath,
      req.method === 'GET' ? req.query : req.body,
      req.headers
    );
    
    res.status(result.status || 200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;