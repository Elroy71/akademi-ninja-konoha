const prisma = require('../utils/prisma');
const { successResponse, errorResponse } = require('../utils/response');
const { validateUser, getUsersData } = require('../utils/userServiceClient');

/**
 * Get all user certificates
 */
const getUserCertificates = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // 🔥 Validate user via User Service
    const user = await validateUser(userId);
    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: parseInt(userId)
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            rankLevel: true
          }
        }
      },
      orderBy: {
        issuedAt: 'desc'
      }
    });

    const transformedCertificates = certificates.map(cert => ({
      id: cert.id,
      certificateNumber: cert.certificateNumber,
      issuedAt: cert.issuedAt,
      course: cert.course,
      user: {
        id: user.id,
        name: user.name,
        ninjaRank: user.ninjaRank
      }
    }));

    return successResponse(res, transformedCertificates, 'Daftar sertifikat berhasil diambil', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get certificate by ID
 */
const getCertificateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { id: parseInt(id) },
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

    if (!certificate) {
      return errorResponse(res, 'Sertifikat tidak ditemukan', 404);
    }

    // Get user data from User Service
    const user = await validateUser(certificate.userId);

    return successResponse(res, {
      ...certificate,
      user: user ? {
        id: user.id,
        name: user.name,
        ninjaRank: user.ninjaRank
      } : null
    }, 'Sertifikat berhasil diambil', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Verify certificate by certificate number
 */
const verifyCertificate = async (req, res, next) => {
  try {
    const { certificateNumber } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { certificateNumber },
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

    if (!certificate) {
      return errorResponse(res, 'Sertifikat tidak valid', 404);
    }

    // Get user data
    const user = await validateUser(certificate.userId);

    return successResponse(res, {
      valid: true,
      certificate: {
        ...certificate,
        user: user ? {
          id: user.id,
          name: user.name,
          ninjaRank: user.ninjaRank
        } : null
      }
    }, 'Sertifikat valid', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Generate certificate manually
 */
const generateCertificate = async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return errorResponse(res, 'User ID dan Course ID wajib diisi', 400);
    }

    // Validate user
    const user = await validateUser(userId);
    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    const existingCertificate = await prisma.certificate.findUnique({
      where: {
        userId_courseId: {
          userId: parseInt(userId),
          courseId: parseInt(courseId)
        }
      }
    });

    if (existingCertificate) {
      return errorResponse(res, 'Sertifikat sudah pernah dibuat', 409);
    }

    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) }
    });

    if (!course) {
      return errorResponse(res, 'Kursus tidak ditemukan', 404);
    }

    const year = new Date().getFullYear();
    const count = await prisma.certificate.count() + 1;
    const rankCode = course.rankLevel.substring(0, 3).toUpperCase();
    const certificateNumber = `KNH-${year}-${String(count).padStart(3, '0')}-${rankCode}`;

    const certificate = await prisma.certificate.create({
      data: {
        userId: parseInt(userId),
        courseId: parseInt(courseId),
        certificateNumber
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

    return successResponse(res, {
      ...certificate,
      user: {
        id: user.id,
        name: user.name,
        ninjaRank: user.ninjaRank
      }
    }, 'Sertifikat berhasil dibuat', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserCertificates,
  getCertificateById,
  verifyCertificate,
  generateCertificate
};