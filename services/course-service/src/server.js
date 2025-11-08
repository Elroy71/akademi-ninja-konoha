require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({
  origin: [process.env.GATEWAY_URL, process.env.FRONTEND_URL, process.env.USER_SERVICE_URL],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[COURSE-SERVICE] ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'course-service',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      courses: {
        getAll: 'GET /api/courses',
        getById: 'GET /api/courses/:id',
        create: 'POST /api/courses'
      },
      enrollments: {
        enroll: 'POST /api/enrollments',
        getUserEnrollments: 'GET /api/enrollments/user/:userId',
        check: 'GET /api/enrollments/check/:userId/:courseId'
      },
      progress: {
        update: 'PUT /api/progress',
        get: 'GET /api/progress/:userId/:courseId',
        getAll: 'GET /api/progress/user/:userId'
      },
      certificates: {
        getUserCerts: 'GET /api/certificates/user/:userId',
        getById: 'GET /api/certificates/:id',
        verify: 'GET /api/certificates/verify/:number',
        generate: 'POST /api/certificates'
      }
    }
  });
});

app.use('/api', routes);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: 'Endpoint not found in Course Service'
  });
});

app.listen(PORT, () => {
  console.log('================================================');
  console.log(`🚀 COURSE SERVICE running on http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 User Service: ${process.env.USER_SERVICE_URL}`);
  console.log('================================================');
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});