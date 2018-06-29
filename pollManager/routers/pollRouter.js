const express = require('express');
const pollTestData = require('../pollTestData.js');
const pollRouter = express.Router();
const db = require('../../db/index.js');

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
  console.log('updating poll ...', req.params.id);
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

