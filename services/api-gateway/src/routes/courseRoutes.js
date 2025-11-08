const express = require('express');
const router = express.Router();
const { courseServiceProxy } = require('../utils/serviceProxy');

/**
 * Forward all course-related requests to Course Service
 * FIXED: Add /api prefix when forwarding
 */
const courseEndpoints = ['/courses', '/enrollments', '/progress', '/certificates'];

courseEndpoints.forEach(endpoint => {
  // Handle with trailing wildcard (e.g., /courses/*)
  router.all(`${endpoint}/*`, forwardToCourseService);
  // Handle exact match (e.g., /courses)
  router.all(endpoint, forwardToCourseService);
});

async function forwardToCourseService(req, res, next) {
  try {
    // Extract path after /api
    const apiPath = req.originalUrl.split('?')[0].replace('/api', '');
    
    // Add /api prefix for Course Service
    const targetPath = `/api${apiPath}`;
    
    // Preserve query string if exists
    const queryString = req.originalUrl.includes('?') 
      ? '?' + req.originalUrl.split('?')[1] 
      : '';
    
    const fullPath = targetPath + queryString;
    
    console.log(`[GATEWAY] Forwarding ${req.method} to Course Service: ${fullPath}`);
    
    const result = await courseServiceProxy.forward(
      req.method,
      fullPath,
      req.method === 'GET' ? req.query : req.body,
      req.headers
    );
    
    res.status(result.status || 200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = router;