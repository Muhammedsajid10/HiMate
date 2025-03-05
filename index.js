const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const languageRoutes = require('./routes/languageRoutes');
const profileRoutes = require('./routes/profileRoutes');
const voiceRoutes = require('./routes/voiceRoutes')
const kycRoutes = require('./routes/kycRoutes')

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/language', languageRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/voice-test',voiceRoutes)
app.use('/api/kyc',kycRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
