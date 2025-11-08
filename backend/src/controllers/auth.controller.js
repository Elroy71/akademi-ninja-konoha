const bcrypt = require('bcrypt');
const prisma = require('../utils/prisma');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Register new user
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return errorResponse(res, 'Semua field wajib diisi', 400);
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return errorResponse(res, 'Email sudah terdaftar', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'student',
        ninjaRank: 'Genin'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        ninjaRank: true,
        createdAt: true
      }
    });

    return successResponse(res, user, 'Registrasi berhasil', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return errorResponse(res, 'Email dan password wajib diisi', 400);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return errorResponse(res, 'Email atau password salah', 401);
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return errorResponse(res, 'Email atau password salah', 401);
    }

    // Return user data (without password)
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      ninjaRank: user.ninjaRank
    };

    return successResponse(res, userData, 'Login berhasil', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user info
 */
const getMe = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        ninjaRank: true,
        createdAt: true
      }
    });

    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    return successResponse(res, user, 'Data user berhasil diambil', 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};