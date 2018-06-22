var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();

// Serve static files to the client
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port)
});
