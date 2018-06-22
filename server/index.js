var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();

// Serve static files to the client
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port);
});

// Stage polls to be run

app.post('/stage', () => {
  console.log('we are trying to stage a poll to be run');
  //create a sockets room
  //create tracker variables
});

app.get('/stage', () => {
  console.log('we are trying to get all of the staged polls');
  // Get them based on what?
});

app.post('/run', () => {
  console.log('we are trying to run a particular poll');
})