const express = require('express');
// const app = express();
const { app, server } = require('./socket/socket.js')
const cors = require('cors');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
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