const express = require('express');
const pollTestData = require('../pollTestData.js');
const pollRouter = express.Router();
const db = require('../../db/index.js');
const realTimeDB = require('../../client/src/firepollManagementClient').realTimeDB;
const firepoll = require('../../client/src/firepollManagementClient').firepoll;
const addResultsToPoll = require('../helpers/addResultsToPoll')

// User should be able to create, read, update and delete polls

// ADDS A POLL TO DB
pollRouter.post('/', (req, res) => {
  console.log('saving a poll ...');
  db.savePoll(req.body, function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      console.log("saved: ", result);
      res.status(200).send(result);
    }
  })
});

// UPDATES A POLL
pollRouter.put('/:id', (req, res) => {
  console.log('updating poll again my dude ...', req.params.id);
  console.log('update: ', req.body)

  db.updatePoll(req.params.id, req.body, function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      res.status(200).send(`updated: ${result.title}`);
    }
  })
});

// CLOSES A LIVE POLL
pollRouter.put('/close/:id', (req, res) => { // assume you get the poll from req.body
  console.log('closing poll ... ', req.params.id);
  setTimeout(() => {
    realTimeDB.ref(`/polls/${req.params.id}`).once('value')
    .then(result => {
      // store that info in mongoDB
      var newPollObj = addResultsToPoll(req.body, result.val().questions);   
      db.updatePoll(req.params.id, newPollObj, function(err, result) {
        if(err) console.error('Inserting results to MongoDB: ', err);
      })
      // remove poll from firestore
      // update staged polls to complete true
      
      res.send(newPollObj);
    })
    .catch(err => {
      res.send(err);
    })
    
    
  }, 2000)
})

// RESPONDS WITH ALL POLLS IN THE DB
pollRouter.get('/', (req, res) => {
  db.retrieveAllPolls(function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    }
    else {
      res.status(200).send(result);
    }
  })
})

// RESPONDS WITH SPECIFIC POLL
pollRouter.get('/:id', (req, res) => {
  db.retrieveOnePoll(req.params.id, function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    }
    else {
      res.status(200).send(result);
    }
  })
})

// RESPONDS WITH ALL POLLS OF BY A SPECIFIC USER
pollRouter.get('/user/:id', (req, res) => {
  console.log('all polls by user requested: userID: ', req.params.id);
  db.retrieveAllPollsOfUser(req.params.id, function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    }
    else {
      res.status(200).send(result);
    }
  })
})


module.exports = pollRouter;

