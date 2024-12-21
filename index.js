const express = require('express');
const cors = require('cors');
const { app, server } = require('./socket/socket.js');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

// Allow CORS from specific frontend domain
app.use(cors({
    origin: 'https://chattter-gilt.vercel.app', // Allow the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Access-Control-Allow-Methods', // Include this header
    ],
    credentials: true // If cookies or Authorization headers are needed
}));

app.options('*', cors({
    origin: 'https://chattter-gilt.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Access-Control-Allow-Methods', // Include this header
    ],
    credentials: true,
}));


// Handle preflight OPTIONS request
app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require('./route/auth');
const messageRoute = require('./route/message');
const userRoute = require('./route/user');
const databaseConnect = require('./database/connection');

app.use('/auth', authRoutes);
app.use('/message', messageRoute);
app.use('/user', userRoute);

// Basic endpoint
app.get('/', (req, res) => {
    res.json({ message: "API live" });
});

const Port = process.env.PORT || 8000;
server.listen(Port, () => {
    databaseConnect();
    console.log(`Server is running on port http://localhost:${Port}`);
});
