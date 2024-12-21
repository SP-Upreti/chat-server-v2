// import { Server } from "socket.io";
const { Server } = require('socket.io')
const http = require('http')
const express = require('express');

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://chattter-gilt.vercel.app'], // Your frontend's origin
        methods: ["GET", "POST"],
        credentials: true, // Allow credentials
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow Content-Type
    }
});

const getReceiverSocketId = (receiverId) => {
    return useSocketMap[receiverId];
}

const useSocketMap = {}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") useSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(useSocketMap))

    console.log("a user connected", socket.id)
    socket.on("disconnect", () => {
        console.log("disconnected");
        delete useSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(useSocketMap))
    })
}

)

module.exports = { app, io, server, getReceiverSocketId };