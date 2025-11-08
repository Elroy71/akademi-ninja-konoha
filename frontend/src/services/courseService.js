import api from './api';

const courseService = {
  /**
   * Get all courses
   */
  getAllCourses: async (rankLevel = null) => {
    try {
      const params = {};
      if (rankLevel && rankLevel !== 'all') {
        params.rankLevel = rankLevel;
      }
      
      const response = await api.get('/courses', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get course by ID
   */
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create new course (admin only)
   */
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default courseService;