const prisma = require('../utils/prisma');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Get all courses
 */
const getAllCourses = async (req, res, next) => {
  try {
    const { rankLevel } = req.query;

    const where = {};
    if (rankLevel && rankLevel !== 'all') {
      where.rankLevel = rankLevel;
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: {
          select: {
            enrollments: true,
            contents: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform data
    const transformedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      rankLevel: course.rankLevel,
      description: course.description,
      duration: course.duration,
      modules: course._count.contents,
      enrolled: course._count.enrollments,
      price: parseFloat(course.price),
      createdAt: course.createdAt
    }));

    return successResponse(res, transformedCourses, 'Daftar kursus berhasil diambil', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get course by ID
 */
const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        contents: {
          orderBy: {
            order: 'asc'
          }
        },
        _count: {
          select: {
            enrollments: true
          }
        }
      }
    });

    if (!course) {
      return errorResponse(res, 'Kursus tidak ditemukan', 404);
    }

    // Transform data
    const transformedCourse = {
      id: course.id,
      title: course.title,
      rankLevel: course.rankLevel,
      description: course.description,
      duration: course.duration,
      modules: course.contents.length,
      enrolled: course._count.enrollments,
      price: parseFloat(course.price),
      contents: course.contents.map(content => ({
        id: content.id,
        title: content.title,
        type: content.type,
        url: content.url,
        order: content.order
      })),
      createdAt: course.createdAt
    };

    return successResponse(res, transformedCourse, 'Detail kursus berhasil diambil', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new course (Admin only - for testing)
 */
const createCourse = async (req, res, next) => {
  try {
    const { title, rankLevel, description, duration, modules } = req.body;

    // Validate input
    if (!title || !rankLevel) {
      return errorResponse(res, 'Title dan rank level wajib diisi', 400);
    }

    const course = await prisma.course.create({
      data: {
        title,
        rankLevel,
        description,
        duration,
        modules: parseInt(modules) || 0,
        price: 0
      }
    });

    return successResponse(res, course, 'Kursus berhasil dibuat', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse
};