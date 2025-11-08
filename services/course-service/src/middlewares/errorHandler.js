const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('❌ [COURSE-SERVICE] Error:', err);

  if (err.code === 'P2002') {
    return errorResponse(res, 'Data sudah ada (duplikat)', 409, err.message);
  }

  if (err.code === 'P2025') {
    return errorResponse(res, 'Data tidak ditemukan', 404, err.message);
  }

  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation error', 400, err.message);
  }

  return errorResponse(
    res,
    err.message || 'Internal Server Error',
    err.statusCode || 500,
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
};

module.exports = errorHandler;