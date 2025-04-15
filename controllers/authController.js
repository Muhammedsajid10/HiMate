const OTP = require('../models/otpModel');
const userModel = require('../models/userModel');
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


//Get Users
exports.GetUsers= async (req,res)=>{
  try {
    let Users= await userModel.find()
    if(!Users){
      return res.status(400).json({success:false, message:"User not found"})
    }
    return res.status(200).json({success:true, Users, message:"User found successfully"})
  } catch (error) {
    console.log('error',error)
    res.status(500).json({success:false, message:"Internal sever error"})
    
  }
}