// const OTP = require('../models/otpModel');
// const userModel = require('../models/userModel');
// const User = require('../models/userModel');
// const generateOTP = require('../utils/otpGenerator');

// // Send OTP
// exports.sendOTP = async (req, res) => {    
//   const { mobileNumber } = req.body;
//   const otp = generateOTP();

//   try {
//     await OTP.create({ mobileNumber, otp });
//     res.status(200).json({ message: 'OTP sent successfully', otp }); // In production, don't send OTP in response
//   } catch (err) {
//     res.status(500).json({ message: 'Error sending OTP', error: err.message });
//   }
// };

// // Verify OTP
// exports.verifyOTP = async (req, res) => {
//   const { mobileNumber, otp } = req.body;
//   try {
//     const validOTP = await OTP.findOne({ mobileNumber, otp });
//     if (!validOTP) return res.status(400).json({ message: 'Invalid OTP' });

//     let user = await User.findOne({ mobileNumber });
//     if (!user) user = await User.create({ mobileNumber });

//     res.status(200).json({ message: 'OTP verified', user });
//   } catch (err) {
//     res.status(500).json({ message: 'Error verifying OTP', error: err.message });
//   }
// };


// //Get Users
// exports.GetUsers= async (req,res)=>{
//   try {
//     let Users= await userModel.find()
//     if(!Users){
//       return res.status(400).json({success:false, message:"User not found"})
//     }
//     return res.status(200).json({success:true, Users, message:"User found successfully"})
//   } catch (error) {
//     console.log('error',error)
//     res.status(500).json({success:false, message:"Internal sever error"})
    
//   }
// }







// javad//


// mock otp using twilio

// const twilio = require('twilio');
// const OTP = require('../models/otpModel');
// const User = require('../models/userModel');
// const generateOTP = require('../utils/otpGenerator');

// // Initialize Twilio client inside the function to ensure .env is loaded
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // Send OTP
// exports.sendOTP = async (req, res) => {
//   const { mobileNumber } = req.body;
//   const otp = generateOTP();

//   console.log(`Attempting to send OTP to mobile number: +91${mobileNumber}`);

//   try {
//     // Send OTP via Twilio
//     const message = await client.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
//       to: `+91${mobileNumber}`, // Add country code
//     });

//     console.log(`OTP sent successfully to +91${mobileNumber}, Message SID: ${message.sid}`);

//     // Save OTP to DB (for verification later)
//     await OTP.create({ mobileNumber, otp });

//     res.status(200).json({ message: 'OTP sent successfully' }); // Don't send OTP in response for security
//   } catch (err) {
//     console.error(`Error sending OTP to +91${mobileNumber}:`, err.message);
//     res.status(500).json({ message: 'Error sending OTP', error: err.message });
//   }
// };

// // Verify OTP
// exports.verifyOTP = async (req, res) => {
//   const { mobileNumber, otp } = req.body;
//   try {
//     const validOTP = await OTP.findOne({ mobileNumber, otp });
//     if (!validOTP) {
//       console.log(`Invalid OTP attempt for +91${mobileNumber}`);
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     let user = await User.findOne({ mobileNumber });
//     if (!user) {
//       console.log(`User not found for mobile number +91${mobileNumber}, creating new user.`);
//       user = await User.create({ mobileNumber });
//     }

//     res.status(200).json({ message: 'OTP verified', user });
//   } catch (err) {
//     console.error('Error verifying OTP:', err.message);
//     res.status(500).json({ message: 'Error verifying OTP', error: err.message });
//   }
// };

// // Get Users
// exports.GetUsers = async (req, res) => {
//   try {
//     let Users = await User.find();
//     if (!Users || Users.length === 0) {
//       return res.status(400).json({ success: false, message: 'No users found' });
//     }
//     return res.status(200).json({ success: true, Users, message: 'Users found successfully' });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };




// fast2sms mock test
const axios = require('axios');
const OTP = require('../models/otpModel');
const User = require('../models/userModel');
const generateOTP = require('../utils/otpGenerator');

// Send OTP (mocked for now)
exports.sendOTP = async (req, res) => {
  const { mobileNumber } = req.body;
  const otp = generateOTP(); // Generate a 4-digit OTP
  const message = `Your OTP is ${otp}`;

  const payload = {
    message: message,
    language: 'english',
    route: 'q',
    numbers: mobileNumber
  };

  try {
    console.log('=== Mock Sending OTP ===');
    console.log('Mobile Number:', mobileNumber);  
    console.log('Generated OTP:', otp);
    console.log('Payload:', payload);
    
    // Simulate Fast2SMS API Response (Mocking Success)
    const mockResponse = {
      status_code: 200,
      message: 'OTP sent successfully'
    };
    
    console.log('Mock Fast2SMS Response:', mockResponse);

    // Save OTP to DB (this part remains the same)
    await OTP.create({ mobileNumber, otp });

    res.status(200).json({ message: 'OTP sent successfully' });

  } catch (err) {
    console.error('=== Failed to Send OTP ===');
    console.error('Error Message:', err.message);

    res.status(500).json({
      message: 'Failed to send OTP',
      error: err.message
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  try {
    console.log('=== Verifying OTP ===');
    console.log('Mobile Number:', mobileNumber);  
    console.log('Entered OTP:', otp);

    // Find the OTP stored in DB
    const validOTP = await OTP.findOne({ mobileNumber, otp });

    if (!validOTP) {
      console.log(`❌ Invalid or expired OTP for ${mobileNumber}`);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if user exists
    let user = await User.findOne({ mobileNumber });
    if (!user) {
      console.log(`User not found for ${mobileNumber}, creating new user.`);
      user = await User.create({ mobileNumber });
    }

    res.status(200).json({ message: 'OTP verified', user });
  } catch (err) {
    console.error('Error verifying OTP:', err.message);
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
};

// Get all users
exports.GetUsers = async (req, res) => {  
  try {
    let users = await User.find();
    if (!users || users.length === 0) {
      return res.status(400).json({ success: false, message: 'No users found' });
    }
    return res.status(200).json({ success: true, users, message: 'Users found successfully' });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
