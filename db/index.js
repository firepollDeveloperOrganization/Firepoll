const mongoose = require('mongoose');
const schema = require('./schema')
require('dotenv').config();
//mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds217131.mlab.com:17131/live-polling-service`);
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

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

const updatePoll = (id, update, cb) => {
  Poll.findByIdAndUpdate(id, update, function(err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

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

const deletePoll = id => Poll.findOneAndRemove({_id: id});

const editPoll = (id, poll) => Poll.findOneAndUpdate({_id: id}, poll, {new: true});

module.exports = {
  savePoll,
  updatePoll,
  deletePoll,
  editPoll,
  retrieveOnePoll,
  retrieveAllPollsOfUser,
  retrieveAllPolls
}