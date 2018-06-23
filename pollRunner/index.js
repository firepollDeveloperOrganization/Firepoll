const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var port = process.env.PORT || 5000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port)
});

app.use(bodyParser.json());

// add a small number of HTTP methods to CRUD a single poll to be run

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

// Stage a single poll

  // add a listener to start poll - 'Start Poll'

  // add a listener to release next question - 'Release Question'

  // add a listener for user response - Sub Answer'

  // add a listener for current stats - 'Get Stats'

  // add a listener for end poll - 'End Poll'

  // add an emitter for next question + answers - 'Release Question'

  // add an emitter for current stats - 'Send Stats'

  // add an emitter for end survey - 'Poll End'

});
