// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const languageRoutes = require('./routes/languageRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const voiceRoutes = require('./routes/voiceRoutes')
// const kycRoutes = require('./routes/kycRoutes')

// const app = express();
// connectDB();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/language', languageRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/voice-test',voiceRoutes)
// app.use('/api/kyc',kycRoutes)

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// javad------------------------------

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const languageRoutes = require("./routes/languageRoutes");
const profileRoutes = require("./routes/profileRoutes");
const voiceRoutes = require("./routes/voiceRoutes");
const kycRoutes = require("./routes/kycRoutes");
// const chatRoute = require("./routes/chatRoutes");
const MessageRoutes = require("./routes/MessageRoutes");
const { Server } = require('socket.io');

const Razorpay = require('razorpay');
const crypto = require('crypto');



const http = require("http");
const cors = require("cors");
// const { default: MessageRoutes } = require("./routes/MessageRoutes");

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/language", languageRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/voice-test", voiceRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/messages", MessageRoutes);


//razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create order endpoint
app.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, 
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});



// Verify payment signature endpoint
app.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure' });
  }
});




// Start Server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);



// Socket Io
const io= new Server(server,{
    cors:{
        origin:"*",
        methods:['GET','POST'],

    }
})
io.on("connection",(socket)=>{
    console.log("A user connected");


      socket.on("disconnect",()=>{
        console.log("User disconnected");
        
    }) 
})



server.listen(PORT, () => console.log(`Server running on port ${PORT}`));