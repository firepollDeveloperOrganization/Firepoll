const express = require('express');
const pollRouter = require('./routers/pollRouter');
const resultHistRouter = require('./routers/resultsRouter');

const app = express();

var port = process.env.PORT || 3000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port)
});

app.use('/polls', pollRouter);
// Add CRUD for polls

app.use('/results', resultHistRouter);
// Add Read / Update for results
// Add function to post to pollRunner with new question
// app.use whatever