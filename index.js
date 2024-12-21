const express = require('express');
// const app = express();
const { app, server } = require('./socket/socket.js')
const cors = require('cors');

// CORS middleware for API routes
app.use(cors({
    origin: ['http://localhost:3000', 'https://chattter-gilt.vercel.app'], // Your frontend's origin
    credentials: true, // Allow credentials (cookies, headers)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow Content-Type and other custom headers
}));

// Add headers explicitly for all routes (optional)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['http://localhost:3000', 'https://chattter-gilt.vercel.app']);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const authRoutes = require('./route/auth');
const messageRoute = require('./route/message.js')
const userRoute = require('./route/user.js')
const databaseConnect = require('./database/connection');

const path = require('path')

dotenv.config();
app.use(cookieParser())

const Port = process.env.PORT || 8000;

app.use('/auth', authRoutes);
app.use('/message', messageRoute);
app.use('/user', userRoute);

// app.use(express.static(path.join(__dirname, "../client/build")))

app.get(
    "/", (req, res) => {
        res.json({ message: "api live" })
    }
)

server.listen(Port, () => {
    databaseConnect();
    console.log(`Server is running on port http://localhost:${Port}`);
});