const mongoose = require('mongoose');
mongoose.connect('mongodb://laurents:stx7JBM-X@ds217131.mlab.com:17131/live-polling-service');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected');
});

const pollSchema = mongoose.Schema({
  author: String,
  title: String,
  status: String,
  executionDate: Date,
  totalAnswers: Number,
  winningAnswer: String,
  questions: [{
    questionId: String,
    question: String,
    questionType: String,
    answers: [{
      choiceId: String,
      choice: String,
      responders: [String],
      votes: Number
    }]
  }]
});

const Poll = mongoose.model('Poll', pollSchema);

// const userSchema = mongoose.Schema({
//   username: String,
//   password: String,
// })

// const User = mongoose.model('User', userSchema);

const savePoll = (poll, cb) => {
  if(poll._id) {
    var poll = new Poll(poll);
    Poll.findByIdAndUpdate(poll._id, poll, {upsert: true}, function(err, result) {
      if (err) {
        cb(err, null);
      } else {
        console.log(result)
        cb(null, result);
      }
    })
  } else {
    var poll = new Poll(poll);
    poll.save().then(result => {
      cb(null, result);
    })
    .catch(err => {
      cb(err, null);
    })
  }
};

// const saveUser = (user, res) => {
//     let user = new User(user);
//     User.findOneAndUpdate({username: user.username}, user, {upsert: true})
//     .then(result => {
//       console.log('saved: ', result);
//       res.status(200).send(result);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(400).send(err);
//     })
// };

const retrieveOnePoll = (id, cb) => {
  Poll.findById(id, function(err, result) {
    if(err) cb(err, null);
    else cb(null, result);
  });
}

const retrieveAllPollsOfUser = (user, cb) => {
  Poll.find({author: user}, function(err, result) {
    if(err) cb(err, null);
    else cb(null, result);
  });
}

const retrieveAllPolls = (cb) => {
  Poll.find(function(err, result) {
    if(err) cb(err, null);
    else cb(null, result);
  });
}



module.exports = {
  savePoll,
  retrieveOnePoll,
  retrieveAllPollsOfUser,
  retrieveAllPolls
}