const express = require('express');
const pollRouter = express.Router();
const db = require('../../db/index.js');
const realTimeDB = require('../../client/src/firepollManagementClient').realTimeDB;
const firepoll = require('../../client/src/firepollManagementClient').firepoll;
const addResultsToPoll = require('../helpers/addResultsToPoll');
const axios = require('axios');
const {CronJob} = require('cron');

cronJobs = {};

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
  db.updatePoll(req.params.id, req.body, function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      if (req.body.active === true) {
      // if the poll is now active, create a cron job to aggregate votes
        if (!cronJobs[result.id]) {
          // if the cron job doesn't exist, create it
          cronJobs[result._id] = new CronJob('*/5 * * * * *', () => {
            console.log('doing a thing');
            for (let question of result.questions) {
              axios.post('https://us-central1-live-poll-ravenclaw.cloudfunctions.net/mapReduceVotes', { poll_id: result._id, question_id: question._id }).then((data) => {
                if (data.status != 200) {
                  console.log('There was an error');
                } else {
                  console.log('Aggregated for the question', question.title);
                }
              })
            }
          }, null, true, 'America/Los_Angeles');
        } else {
          // if the cron job does exist, start it
          cronJobs[result._id].start()
        }
      }
      res.status(200).send(`updated: ${result.title}`);
    }
  })
});

// DELETES A POLL
pollRouter.delete('/:id', (req, res) => {
  db.deletePoll(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.send(err)); //change error-handling later
});

// CLOSES A LIVE POLL
pollRouter.put('/close/:id', (req, res) => { // assume you get the poll from req.body
  console.log('closing poll ... ', req.params.id);
  setTimeout(() => {
    realTimeDB.ref(`/polls/${req.params.id}`).once('value')
    .then(result => {
      // store that info in mongoDB
      var newPollObj = addResultsToPoll(req.body, result.val().questions);  
      console.log("New Poll Obj: ", newPollObj);
      db.updatePoll(req.params.id, newPollObj, function(err, result) {
        if(err) {
          console.error('Inserting results to MongoDB: ', err);
          res.send(err);
        } else {
          res.send(newPollObj);
        }
      })
      // remove poll from firestore
      // update staged polls to complete true   
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

