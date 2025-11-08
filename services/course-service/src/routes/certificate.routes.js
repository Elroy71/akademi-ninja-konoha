const express = require('express');
const router = express.Router();
const { 
  getUserCertificates, 
  getCertificateById, 
  verifyCertificate,
  generateCertificate 
} = require('../controllers/certificate.controller');

router.get('/user/:userId', getUserCertificates);
router.get('/:id', getCertificateById);
router.get('/verify/:certificateNumber', verifyCertificate);
router.post('/', generateCertificate);

module.exports = router;