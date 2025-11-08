const errorHandler = (err, req, res, next) => {
  console.error('[GATEWAY] ❌ Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    status,
    message,
    error: process.env.NODE_ENV === 'development' ? err.data : null
  });
};

module.exports = errorHandler;