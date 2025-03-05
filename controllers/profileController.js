const User = require('../models/userModel');

exports.updateProfile = async (req, res) => {
  const { mobileNumber, username, dateOfBirth, gender } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { mobileNumber },
      { username, dateOfBirth, gender },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};