const express = require('express');
const { app, server } = require('./socket/socket.js');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

app.use(cors({
    origin: 'https://chattter-gilt.vercel.app', // Your frontend's domain
    credentials: true, // Include credentials like cookies
}));

// Set CORS headers manually (optional but explicit)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://chattter-gilt.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


// Handle preflight OPTIONS request
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./route/auth');
const messageRoute = require('./route/message');
const userRoute = require('./route/user');
const databaseConnect = require('./database/connection');

app.use('/auth', authRoutes);
app.use('/message', messageRoute);
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.json({ message: "API live" });
});

const Port = process.env.PORT || 8000;

server.listen(Port, () => {
    databaseConnect();
    console.log(`Server is running on port http://localhost:${Port}`);
});
