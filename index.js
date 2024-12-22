const express = require('express');
const { app, server } = require('./socket/socket.js')
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const authRoutes = require('./route/auth');
const messageRoute = require('./route/message.js')
const userRoute = require('./route/user.js')
const databaseConnect = require('./database/connection');
const path = require('path')

app.use(cors({
    origin: ['http://localhost:3000', 'https://chattter-gilt.vercel.app/'],
    credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
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