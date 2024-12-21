const express = require('express');
const { app, server } = require('./socket/socket.js');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

app.use(cors({
    origin: ['http://localhost:3000', 'https://chattter-gilt.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
