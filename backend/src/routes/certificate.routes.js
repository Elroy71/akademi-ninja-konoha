const express = require('express');
const router = express.Router();
const { 
  getUserCertificates, 
  getCertificateById, 
  verifyCertificate,
  generateCertificate 
} = require('../controllers/certificate.controller');

// GET /api/certificates/user/:userId - Get user certificates
router.get('/user/:userId', getUserCertificates);

// GET /api/certificates/:id - Get certificate by ID
router.get('/:id', getCertificateById);

// GET /api/certificates/verify/:certificateNumber - Verify certificate
router.get('/verify/:certificateNumber', verifyCertificate);

// POST /api/certificates - Generate certificate manually
router.post('/', generateCertificate);

module.exports = router;