const express = require('express');
const io = require('socket.io')(server);

const app = express();

var port = process.env.PORT || 5000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port)
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

})