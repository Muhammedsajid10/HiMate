const OTP = require('../models/otpModel');
const User = require('../models/userModel');
const generateOTP = require('../utils/otpGenerator');

// Send OTP
exports.sendOTP = async (req, res) => {
  const { mobileNumber } = req.body;
  const otp = generateOTP();

  try {
    await OTP.create({ mobileNumber, otp });
    res.status(200).json({ message: 'OTP sent successfully', otp }); // In production, don't send OTP in response
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  try {
    const validOTP = await OTP.findOne({ mobileNumber, otp });
    if (!validOTP) return res.status(400).json({ message: 'Invalid OTP' });

    let user = await User.findOne({ mobileNumber });
    if (!user) user = await User.create({ mobileNumber });

    res.status(200).json({ message: 'OTP verified', user });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
};
