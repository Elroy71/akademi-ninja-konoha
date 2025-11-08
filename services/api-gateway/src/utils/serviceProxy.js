const axios = require('axios');

/**
 * Proxy utility for forwarding requests to microservices
 */
class ServiceProxy {
  constructor(serviceUrl, serviceName) {
    this.serviceName = serviceName;
    this.client = axios.create({
      baseURL: serviceUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Forward request to service
   */
  async forward(method, path, data = null, headers = {}) {
    try {
      const fullUrl = `${this.client.defaults.baseURL}${path}`;
      console.log(`[GATEWAY → ${this.serviceName}] ${method.toUpperCase()} ${fullUrl}`);
      
      const config = {
        method: method.toLowerCase(),
        url: path,
        headers: { 
          ...this.client.defaults.headers, 
          ...headers,
          // Remove host header to avoid conflicts
          host: undefined
        }
      };

      if (data) {
        if (method.toLowerCase() === 'get') {
          config.params = data;
        } else {
          config.data = data;
        }
      }

      const response = await this.client.request(config);
      
      console.log(`[GATEWAY ← ${this.serviceName}] ${response.status} ${response.statusText}`);
      
      return response.data;
    } catch (error) {
      console.error(`[GATEWAY ← ${this.serviceName}] ❌ Error:`, error.message);
      
      if (error.response) {
        console.error(`[GATEWAY ← ${this.serviceName}] Response:`, {
          status: error.response.status,
          data: error.response.data
        });
        
        throw {
          status: error.response.status,
          message: error.response.data.message || 'Service error',
          data: error.response.data
        };
      }
      
      // Service unavailable
      throw {
        status: 503,
        message: `${this.serviceName} unavailable`,
        data: null
      };
    }
  }
}

// Create service proxies with names for better logging
const userServiceProxy = new ServiceProxy(
  process.env.USER_SERVICE_URL, 
  'USER-SERVICE'
);

const courseServiceProxy = new ServiceProxy(
  process.env.COURSE_SERVICE_URL, 
  'COURSE-SERVICE'
);

module.exports = {
  userServiceProxy,
  courseServiceProxy
};