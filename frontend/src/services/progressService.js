import api from './api';

const progressService = {
  /**
   * Update user progress
   */
  updateProgress: async (userId, courseId, percent) => {
    try {
      const response = await api.put('/progress', {
        userId: parseInt(userId),
        courseId: parseInt(courseId),
        percent: parseFloat(percent)
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get specific progress
   */
  getProgress: async (userId, courseId) => {
    try {
      const response = await api.get(`/progress/${userId}/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all user progress
   */
  getAllUserProgress: async (userId) => {
    try {
      const response = await api.get(`/progress/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default progressService;