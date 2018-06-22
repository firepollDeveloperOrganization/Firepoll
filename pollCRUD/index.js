const express = require('express');
const pollRouter = require('./routers/pollRouter');
const resultHistRouter = require('./routers/resultHistRouter');

const app = express();

var port = process.env.PORT || 3000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port)
});

app.use('/polls', pollRouter);

app.use('/results', resultHistRouter);