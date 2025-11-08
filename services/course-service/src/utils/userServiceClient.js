const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001/api';

console.log(`[COURSE-SERVICE] User Service URL: ${USER_SERVICE_URL}`);

/**
 * Client untuk komunikasi dengan User Service
 * Ini adalah implementasi SERVICE-TO-SERVICE COMMUNICATION
 */
const userServiceClient = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for debugging
userServiceClient.interceptors.response.use(
  response => {
    console.log(`[COURSE-SERVICE ← USER-SERVICE] ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    console.error(`[COURSE-SERVICE ← USER-SERVICE] ❌ ${error.message}`);
    return Promise.reject(error);
  }
);

/**
 * Validate user exists and get user data
 */
const validateUser = async (userId) => {
  try {
    console.log(`[COURSE-SERVICE → USER-SERVICE] GET /auth/users/${userId}`);
    const response = await userServiceClient.get(`/auth/users/${userId}`);
    
    if (response.data.success) {
      console.log(`[COURSE-SERVICE] ✅ User validated: ${response.data.data.name}`);
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error(`[COURSE-SERVICE] ❌ Error validating user ${userId}:`, error.message);
    if (error.response?.status === 404) {
      return null; // User not found
    }
    throw new Error('User Service tidak merespons atau user tidak ditemukan');
  }
};

/**
 * Get multiple users data (for enrichment)
 */
const getUsersData = async (userIds) => {
  try {
    const promises = userIds.map(id => 
      userServiceClient.get(`/auth/users/${id}`).catch(() => null)
    );
    
    const responses = await Promise.all(promises);
    
    return responses
      .filter(res => res && res.data.success)
      .map(res => res.data.data);
  } catch (error) {
    console.error(`[COURSE-SERVICE] ❌ Error getting users data:`, error.message);
    return [];
  }
};

module.exports = {
  validateUser,
  getUsersData
};