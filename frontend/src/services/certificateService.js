import api from './api';

const certificateService = {
  /**
   * Get user certificates
   */
  getUserCertificates: async (userId) => {
    try {
      const response = await api.get(`/certificates/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get certificate by ID
   */
  getCertificateById: async (certificateId) => {
    try {
      const response = await api.get(`/certificates/${certificateId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Verify certificate
   */
  verifyCertificate: async (certificateNumber) => {
    try {
      const response = await api.get(`/certificates/verify/${certificateNumber}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Generate certificate manually
   */
  generateCertificate: async (userId, courseId) => {
    try {
      const response = await api.post('/certificates', {
        userId: parseInt(userId),
        courseId: parseInt(courseId)
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default certificateService;