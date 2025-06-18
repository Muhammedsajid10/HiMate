// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };
//   module.exports = generateOTP;


//javad


// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
// };

// module.exports = generateOTP;


const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
};

module.exports = generateOTP;
