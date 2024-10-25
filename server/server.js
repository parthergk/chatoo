const express = require("express");
const http = require('http');
const socketIo = require("socket.io");
const cors = require('cors');
<<<<<<< HEAD
=======

>>>>>>> 325e5fda0d6b0d4857669310bd414809d84277f6

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
    console.log("Socket is active and connected");

    socket.on("join_room", (data) => {
        const { user, room } = data;
        socket.join(room);
        const joinMessage = `User ${user} has joined the room: ${room}`;
        io.in(room).emit("join_room", joinMessage);
    });

    socket.on("chat", (message) => {
        const { room, content, user, replyTo } = message; // Added replyTo in destructure
        io.in(room).emit("chat", { user, content, replyTo: replyTo || null }); // Emit replyTo if exists
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
