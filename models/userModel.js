const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true, unique: true },
  username: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female'], default : 'Female' },
  language: { type: String },
});

module.exports = mongoose.model('User', UserSchema);