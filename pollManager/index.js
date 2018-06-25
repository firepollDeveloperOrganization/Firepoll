const express = require('express');
const bodyParser = require('body-parser');
const pollRouter = require('./routers/pollRouter');
const resultHistRouter = require('./routers/resultsRouter');
const stageRouter = require('./routers/stageRouter');
const cors = require('cors');
const firebase = require('./firebaseServerConfig/firebaseConfig.js');
require('dotenv').config();

console.log(process.env.DATABASE_URL);

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

// Serve static files to the client
app.use(express.static(__dirname + '/../client/dist'));

app.options('*', cors());

app.use('/polls', cors(), pollRouter);

app.use('/results', resultHistRouter);

app.use('/stage', stageRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  });
})

var port = process.env.PORT || 8000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port);
});