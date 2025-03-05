const express = require('express');
const multer = require('multer');
const { submitKYC, uploadKYCFiles, checkKYCStatus } = require('../controllers/kycController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage

console.log("KYC Routes Loaded");

router.post('/submit', submitKYC);
router.post('/upload', upload.array('documents', 2), uploadKYCFiles);
router.get('/status/:userId', checkKYCStatus);

module.exports = router;
