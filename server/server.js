const express = require("express");
const http = require('http');
const socketIo = require("socket.io");
const cors = require('cors');
const cors = require('cors');

const app = express();
const httpServer = http.createServer(app);

const port = process.env.PORT || 5000;

const io = socketIo(httpServer, {
    cors: {
        origin: "*"
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("Socket is active to be connected");

    socket.on("join_room", (data) => {
        const { user, room } = data;
        socket.join(room);
        const joinMessage = `User ${user} has joined the room: ${room}`;
        io.in(room).emit("join_room", joinMessage);
    });

    socket.on("chat", (message) => {
        const { room, content, user } = message;
        io.in(room).emit("chat", { user, content });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on ${port}` );
});
