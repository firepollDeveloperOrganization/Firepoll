const express = require('express');
const stageRouter = express.Router();
const admin = require('../firebaseServerConfig/firebaseConfig.js');
require('dotenv').config();

// Users should be able to create, and read results;

const db = admin.firestore()

stageRouter.post('/', (req, res) => {
  var pollsRef = db.collection('polls').doc();
  pollsRef.set({
    "start_time": "2018-06-26T16:00:00.000Z",
    "poll_title": "Nick's Poll",
    "total_voting_time": 1000,
    "active": false,
    "num_questions": "3"
  });
});

// Get all of the polls and send them to the client 
// poll data is sent per example below
stageRouter.get('/', (req, res) => {
  var pollsRef = db.collection('polls');
  pollsRef.get().then(snapshot => {
    data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data()
      })
    });
    return data;
  }).then((data) => {
    res.status(200).send(data);
  }).catch(err => {console.log(err)});
});

module.exports = stageRouter;