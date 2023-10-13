const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',
    }
  });
app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    io.emit('message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
