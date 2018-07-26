const express = require('express');
const bodyParser = require('body-parser');
const pollRouter = require('./routers/pollRouter');
const resultHistRouter = require('./routers/resultsRouter');
const stageRouter = require('./routers/stageRouter');
const notificationsRouter = require('./routers/notificationsRouter');

const path = require('path');
var compression = require('compression');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Serve static files to the client
app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(express.static(__dirname + '/../client/dist'));

app.options('/response');

app.get('/ip', ((req, res) => {
  console.log('hey');
  console.log(req.connection.remoteAddress);
  res.status(200).send(req.connection.remoteAddress);
}))

app.use('/polls', pollRouter);

app.use('/results', resultHistRouter);

app.use('/stage', stageRouter);

app.use('/notifications', notificationsRouter);

app.get('/response/:pollId', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/responseClientIndex.html'), (err) => {
    if (err) res.status(500).send(err);
  });
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/managementClientIndex.html'), (err) => {
    if (err) res.status(500).send(err);
  });
})

var port = process.env.PORT || 5000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port);
});