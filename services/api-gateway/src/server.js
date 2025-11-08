require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'api-gateway',
    version: '1.0.0',
    message: 'Akademi Ninja Konoha API Gateway',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      courses: '/api/courses/*',
      enrollments: '/api/enrollments/*',
      progress: '/api/progress/*',
      certificates: '/api/certificates/*'
    },
    services: {
      userService: process.env.USER_SERVICE_URL,
      courseService: process.env.COURSE_SERVICE_URL
    }
  });
});

app.use('/api', routes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('================================================');
  console.log(`🌐 API GATEWAY running on http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log('================================================');
  console.log('📡 Connected Services:');
  console.log(`   - User Service: ${process.env.USER_SERVICE_URL}`);
  console.log(`   - Course Service: ${process.env.COURSE_SERVICE_URL}`);
  console.log('================================================');
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});