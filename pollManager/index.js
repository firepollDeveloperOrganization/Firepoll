const express = require('express');
const bodyParser = require('body-parser');
const pollRouter = require('./routers/pollRouter');
const resultHistRouter = require('./routers/resultsRouter');
const cors = require('cors');
const firebase = require('firebase');
require('dotenv').config();

var config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port)
});

app.options('*', cors());

app.use('/polls', cors(), pollRouter);

app.use('/results', resultHistRouter);
// Add Read / Update for results
// Add function to post to pollRunner with new question
// app.use whatever