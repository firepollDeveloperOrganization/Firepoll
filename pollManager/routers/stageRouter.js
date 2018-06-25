const express = require('express');
const stageRouter = express.Router();
const firebase = require('../firebaseServerConfig/firebaseConfig.js');
require('dotenv').config();

// Users should be able to create, and read results;

db = firebase.database()

stageRouter.post('/', (req, res) => {
  db.ref('/question').set({
    question: 'This is test question text',
    answer: 'this is a test answer'
  }).then(() => {
    res.status(200).send();
  }).catch((err) => {
    console.log(err);
  });
})

stageRouter.get('/', (req, res) => {
  console.log('someone wants a specific poll');
  async () => {
    var question = await db.ref('question/' + 'THISISATESTQUESTIONID').value();
    res.status(200).send(question);
  }
})

module.exports = stageRouter;