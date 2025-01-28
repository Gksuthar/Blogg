const express = require('express');
const cors = require('cors');
const AdminRoute = require('./Router/adminRoutes');
const postRoute = require('./Router/postRoutes');
const userRoute = require('./Router/userRoutes');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Environment variables
const PORT = process.env.PORT || 1000;

// Routes
app.use('/api', AdminRoute);
app.use('/api', postRoute);
app.use('/api', userRoute);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
