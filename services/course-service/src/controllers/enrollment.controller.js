const prisma = require('../utils/prisma');
const { successResponse, errorResponse } = require('../utils/response');
const { validateUser } = require('../utils/userServiceClient');

/**
 * Enroll user to a course
 */
const enrollCourse = async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return errorResponse(res, 'User ID dan Course ID wajib diisi', 400);
    }

    // 🔥 SERVICE-TO-SERVICE CALL: Validate user exists
    console.log(`[COURSE-SERVICE] Validating user ${userId} via User Service...`);
    const user = await validateUser(userId);
    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }
    console.log(`[COURSE-SERVICE] ✅ User validated: ${user.name}`);

    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) }
    });

    if (!course) {
      return errorResponse(res, 'Kursus tidak ditemukan', 404);
    }

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: parseInt(userId),
          courseId: parseInt(courseId)
        }
      }
    });

    if (existingEnrollment) {
      return errorResponse(res, 'Anda sudah terdaftar di kursus ini', 409);
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: parseInt(userId),
        courseId: parseInt(courseId)
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            rankLevel: true
          }
        }
      }
    });

    // Create initial progress
    await prisma.progress.create({
      data: {
        userId: parseInt(userId),
        courseId: parseInt(courseId),
        percent: 0
      }
    });

    return successResponse(res, {
      ...enrollment,
      user: { id: user.id, name: user.name }
    }, 'Berhasil mendaftar kursus', 201);
  } catch (error) {
    console.error('[COURSE-SERVICE] Error in enrollCourse:', error);
    next(error);
  }
};

/**
 * Get user enrollments
 */
const getUserEnrollments = async (req, res, next) => {
  try {
    const { userId } = req.params;

    console.log(`[COURSE-SERVICE] Getting enrollments for user ${userId}`);

    // 🔥 SERVICE-TO-SERVICE CALL
    const user = await validateUser(userId);
    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: parseInt(userId) },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            rankLevel: true,
            description: true,
            duration: true,
            modules: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Get progress data
    const progressData = await prisma.progress.findMany({
      where: { userId: parseInt(userId) }
    });

    const transformedEnrollments = enrollments.map(enrollment => {
      const progress = progressData.find(p => p.courseId === enrollment.courseId);
      return {
        id: enrollment.id,
        enrolledAt: enrollment.createdAt,
        course: {
          ...enrollment.course,
          progress: progress ? parseFloat(progress.percent) : 0,
          completed: progress ? parseFloat(progress.percent) >= 100 : false
        }
      };
    });

    console.log(`[COURSE-SERVICE] Found ${transformedEnrollments.length} enrollments`);

    return successResponse(res, transformedEnrollments, 'Daftar enrollment berhasil diambil', 200);
  } catch (error) {
    console.error('[COURSE-SERVICE] Error in getUserEnrollments:', error);
    next(error);
  }
};

/**
 * Check enrollment status
 */
const checkEnrollment = async (req, res, next) => {
  try {
    const { userId, courseId } = req.params;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: parseInt(userId),
          courseId: parseInt(courseId)
        }
      }
    });

    return successResponse(res, { isEnrolled: !!enrollment }, 'Status enrollment berhasil dicek', 200);
  } catch (error) {
    console.error('[COURSE-SERVICE] Error in checkEnrollment:', error);
    next(error);
  }
};

module.exports = {
  enrollCourse,
  getUserEnrollments,
  checkEnrollment
};