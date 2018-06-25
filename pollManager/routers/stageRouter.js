const express = require('express');
const stageRouter = express.Router();
const firebase = require('../firebaseServerConfig/firebaseConfig.js');
const testData = require('../pollTestData.js');
require('dotenv').config();

// Users should be able to create, and read results;

db = firebase.database()

stageRouter.post('/', (req, res) => {
  db.ref('/polls').push(testData).then(() => {
    res.status(200).send();
  }).catch((err) => {
    console.log(err);
  });
});

stageRouter.get('/', (req, res) => {
  var getPolls = async () => {
    var question = await db.ref('/polls').once('value');
    res.status(200).send(question);
  }
  getPolls();
});

module.exports = stageRouter;