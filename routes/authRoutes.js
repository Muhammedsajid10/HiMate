// const express = require('express');
// const { sendOTP, verifyOTP,GetUsers } = require('../controllers/authController');
// const router = express.Router();

// router.post('/send-otp', sendOTP);
// router.post('/verify-otp', verifyOTP);
// router.get ('/getUser',GetUsers)
// module.exports = router;


//javad
const express = require('express');
const { sendOTP, verifyOTP, GetUsers } = require('../controllers/authController');
const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.get('/getUser', GetUsers);

module.exports = router;
