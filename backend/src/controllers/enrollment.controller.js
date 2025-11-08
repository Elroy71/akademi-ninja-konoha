const prisma = require('../utils/prisma');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Enroll user to a course
 */
const enrollCourse = async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    // Validate input
    if (!userId || !courseId) {
      return errorResponse(res, 'User ID dan Course ID wajib diisi', 400);
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) }
    });

    if (!course) {
      return errorResponse(res, 'Kursus tidak ditemukan', 404);
    }

    // Check if already enrolled
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

    // Create enrollment
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

    return successResponse(res, enrollment, 'Berhasil mendaftar kursus', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user enrollments
 */
const getUserEnrollments = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: parseInt(userId)
      },
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
        },
        user: {
          select: {
            progress: {
              where: {
                userId: parseInt(userId)
              },
              select: {
                courseId: true,
                percent: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform data with progress
    const transformedEnrollments = enrollments.map(enrollment => {
      const progress = enrollment.user.progress.find(
        p => p.courseId === enrollment.courseId
      );

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

    return successResponse(res, transformedEnrollments, 'Daftar enrollment berhasil diambil', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Check if user is enrolled in a course
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

    return successResponse(
      res,
      { isEnrolled: !!enrollment },
      'Status enrollment berhasil dicek',
      200
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enrollCourse,
  getUserEnrollments,
  checkEnrollment
};