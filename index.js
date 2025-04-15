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

// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const languageRoutes = require('./routes/languageRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const voiceRoutes = require('./routes/voiceRoutes')
// const kycRoutes = require('./routes/kycRoutes')
// const chatRoute = require('./routes/chatRoutes')

// require("dotenv").config();
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");


// const app = express();
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/language', languageRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/voice-test',voiceRoutes)
// app.use('/api/kyc',kycRoutes)

// // mongodb-------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const server = http.createServer(app);


// // Import Message Model
// const Message = require("./models/chatModel");

// // Initialize Socket.io
// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// // User Connection Handling
// io.on("connection", (socket) => {
//   console.log(`🟢 User Connected: ${socket.id}`);

//   // Store User in Redis
//   socket.on("userOnline", async (userId) => {
//     await redisClient.set(userId, socket.id);
//     console.log(`✅ User ${userId} is online`);
//   });

//   // Handle Message Sending
//   socket.on("sendMessage", async (data) => {
//     const { sender, receiver, message } = data;
//     console.log("📩 New Message:", data);

//     // Save Message to Database
//     const newMessage = new Message({ sender, receiver, message });
//     await newMessage.save();

//     // Check if Receiver is Online
//     const receiverSocketId = await redisClient.get(receiver);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("receiveMessage", data);
//       console.log(`📤 Message sent to ${receiver}`);
//     } else {
//       console.log(`⚠️ User ${receiver} is offline. Message stored.`);
//     }
//   });

//   // User Disconnection
//   socket.on("disconnect", async () => {
//     console.log(`🔴 User Disconnected: ${socket.id}`);
//     await redisClient.del(socket.id);
//   });
// });

// // Chat Routes
// app.use("/api/chat", chatRoute);




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
// const http = require('http'); // already required above


require("dotenv").config();
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

