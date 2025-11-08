/**
 * Success Response Helper
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message,
    data
  });
};

/**
 * Error Response Helper
 */
const errorResponse = (res, message = 'Error', statusCode = 500, error = null) => {
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    error
  });
};

module.exports = {
  successResponse,
  errorResponse
};