const mongoose = require('mongoose');
const schema = require('./schema')
mongoose.connect('mongodb://laurents:stx7JBM-X@ds217131.mlab.com:17131/live-polling-service');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected');
});

const pollSchema = mongoose.Schema(schema);

const Poll = mongoose.model('Poll', pollSchema);

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