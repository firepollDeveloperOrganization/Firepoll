const express = require('express');

const app = express();

var port = process.env.PORT || 5000;

var server = app.listen(port, () => {
  console.log('listening on port, ', port)
});

const io = require('socket.io')(server);

// ========= STAGING POLLS FOR EXECUTION =========

app.post('/stage', () => {
  console.log('we are trying to stage a poll to be run');
  //create a sockets room
  //create tracker variables
});

app.get('/stage', () => {
  console.log('we are trying to get all of the staged polls');
  // Get them based on what?
});

// ========= POLL ANALYTICS DURING RUNTIME (RESTFUL REQUESTS) =========

app.get('/analytics', () => {
  console.log('we want analytics for a poll that is currently being run');
  //create a sockets room
  //create tracker variables
});

app.get('/stage', () => {
  console.log('we are trying to get all of the staged polls');
  // Get them based on what?
});

// ========= POLL EXECUTION =========

app.post('/run', () => {
  // emit start event to all connected users
  console.log('we are trying to run a particular poll');
});

// ========= SOCKETS FUNCTIONALITY START =========

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})



/*
JSON Data required for staging polls
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