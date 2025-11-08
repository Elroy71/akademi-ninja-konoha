import api from './api';

const enrollmentService = {
  /**
   * Enroll user to a course
   */
  enrollCourse: async (userId, courseId) => {
    try {
      const response = await api.post('/enrollments', {
        userId: parseInt(userId),
        courseId: parseInt(courseId)
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get user enrollments
   */
  getUserEnrollments: async (userId) => {
    try {
      const response = await api.get(`/enrollments/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Check if user is enrolled in a course
   */
  checkEnrollment: async (userId, courseId) => {
    try {
      const response = await api.get(`/enrollments/check/${userId}/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default enrollmentService;