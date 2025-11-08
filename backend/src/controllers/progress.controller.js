const prisma = require('../utils/prisma');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Update user progress
 */
const updateProgress = async (req, res, next) => {
  try {
    const { userId, courseId, percent } = req.body;

    // Validate input
    if (!userId || !courseId || percent === undefined) {
      return errorResponse(res, 'User ID, Course ID, dan percent wajib diisi', 400);
    }

    // Validate percent range
    const percentValue = parseFloat(percent);
    if (percentValue < 0 || percentValue > 100) {
      return errorResponse(res, 'Percent harus antara 0-100', 400);
    }

    // Check if enrollment exists
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: parseInt(userId),
          courseId: parseInt(courseId)
        }
      }
    });

    if (!enrollment) {
      return errorResponse(res, 'Anda belum terdaftar di kursus ini', 404);
    }

    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_courseId: {
          userId: parseInt(userId),
          courseId: parseInt(courseId)
        }
      },
      update: {
        percent: percentValue
      },
      create: {
        userId: parseInt(userId),
        courseId: parseInt(courseId),
        percent: percentValue
      },
      include: {
        course: {
          select: {
            title: true,
            rankLevel: true
          }
        }
      }
    });

    // If progress reaches 100%, auto-generate certificate
    if (percentValue >= 100) {
      const existingCertificate = await prisma.certificate.findUnique({
        where: {
          userId_courseId: {
            userId: parseInt(userId),
            courseId: parseInt(courseId)
          }
        }
      });

      if (!existingCertificate) {
        // Generate certificate number
        const year = new Date().getFullYear();
        const count = await prisma.certificate.count() + 1;
        const rankCode = progress.course.rankLevel.substring(0, 3).toUpperCase();
        const certificateNumber = `KNH-${year}-${String(count).padStart(3, '0')}-${rankCode}`;

        await prisma.certificate.create({
          data: {
            userId: parseInt(userId),
            courseId: parseInt(courseId),
            certificateNumber
          }
        });
      }
    }

    return successResponse(res, {
      ...progress,
      percent: parseFloat(progress.percent)
    }, 'Progress berhasil diupdate', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user progress for a course
 */
const getProgress = async (req, res, next) => {
  try {
    const { userId, courseId } = req.params;

    const progress = await prisma.progress.findUnique({
      where: {
        userId_courseId: {
          userId: parseInt(userId),
          courseId: parseInt(courseId)
        }
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

    if (!progress) {
      return errorResponse(res, 'Progress tidak ditemukan', 404);
    }

    return successResponse(res, {
      ...progress,
      percent: parseFloat(progress.percent)
    }, 'Progress berhasil diambil', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all user progress
 */
const getAllUserProgress = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const progressList = await prisma.progress.findMany({
      where: {
        userId: parseInt(userId)
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            rankLevel: true,
            duration: true
          }
        }
      },
      orderBy: {
        percent: 'desc'
      }
    });

    const transformedProgress = progressList.map(progress => ({
      ...progress,
      percent: parseFloat(progress.percent)
    }));

    return successResponse(res, transformedProgress, 'Semua progress berhasil diambil', 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProgress,
  getProgress,
  getAllUserProgress
};