const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sajidalhijas:sKY2WXFmVKov5Mi1@datingapp.6rixc.mongodb.net/?retryWrites=true&w=majority&appName=DatingApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB; 
