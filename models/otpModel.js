// const mongoose = require('mongoose');

// const OTPSchema = new mongoose.Schema({
//   mobileNumber: { type: String, required: true },
//   otp: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes
// });

// module.exports = mongoose.model('OTP', OTPSchema);



// javad//
const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes
});

module.exports = mongoose.model('OTP', OTPSchema);
