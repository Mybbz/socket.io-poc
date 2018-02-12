const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use('/test', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static(path.join(__dirname, '')));

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} is connected`);

  socket.on('chat', (msg) => {
    // console.log(msg);
    io.emit('chat', msg);
  });

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} is disconnected`);
  });
});

server.listen(3000, () => {
  console.log('App is listening to port 3000');
});
