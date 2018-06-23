var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();

// Serve static files to the client
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  });
})

var port = process.env.PORT || 8000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port);
});