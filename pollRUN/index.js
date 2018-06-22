const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var port = process.env.PORT || 5000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port)
});

app.use(bodyParser.json());

const io = require('socket.io')(server);

// ========= STAGED POLL (in-memory) ========

var stageTheSubmittedPoll = (pollObj) => {
  pollObj.isLive = false;
  pollObj.currBucket = 0;
  pollObj.currQuestion = 0;
  stagedPolls[pollObj.poll.name] = pollObj;
}

var stagedPolls = {};

// ========= SOCKET CONNECTION MONITORING =========

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // ========= SOCKET POLL ========

  socket.on('join poll', (data) => {
    socket.join(data);
    console.log('client has joined poll');
  })

// ========= RUN POLL ========

  var runTheSelectedPoll = (poll) => {
    poll.isLive = true;
    socket.emit('poll created', {name: poll});
  }

// ========== STAGE / START POLLS ==========

  socket.on('stage poll', (pollData) => {
    stageTheSubmittedPoll(pollData);
  });

  socket.on('start poll', (pollToStart) => {
    runTheSelectedPoll(stagedPolls[pollToStart.name]);
    console.log(stagedPolls);
    console.log('started the poll');
  });

// ========== POLL CHANNEL MANAGEMENT ==========

});

/*
Data structure for staging polls
{
  "Poll" : {
    "name": "Nick's Poll",
    "protected: {
      status: TRUE || FALSE,
      password: #HASH
    },
    "startTrigger": {
      "manual": null || "auto": "unicode [date]"
    },
    "executionBuckets": [
      "bucket": {
        "order": 1,
        "name": #BUCKET NAME,
        "questions" : [
          {
            "order": [integer],
            "type": ["multiple-choice", "text-entry", "scale"],
            "prompt": "[text]"
            "answers" : ["answer1, answer2"]
          }, 
          {
            "order": [integer],
            "type": ["multiple-choice", "text-entry", "scale"],
            "prompt": "[text]",
            "answers" : ["answer1, answer2"]
          }
        ]
      }
    ]
  }
}
*/

// Deprecated restful endpoints

// ========= STAGING POLLS FOR EXECUTION =========

// app.post('/stage', (req, res) => {
//   console.log(req.body);
//   console.log('we are trying to stage a poll to be run');
//   res.status(200).send();
// });

// app.get('/stage', () => {
//   console.log('we are trying to get all of the staged polls');
//   // Get them based on what?
// });

// // ========= POLL ANALYTICS DURING RUNTIME (RESTFUL REQUESTS) =========

// app.get('/analytics', () => {
//   console.log('we want analytics for a poll that is currently being run');
//   //create a sockets room
//   //create tracker variables
// });

// app.get('/stage', () => {
//   console.log('we are trying to get all of the staged polls');
//   // Get them based on what?
// });

// // ========= POLL EXECUTION =========

// app.post('/run', () => {
//   // emit start event to all connected users
//   console.log('we are trying to run a particular poll');
// });