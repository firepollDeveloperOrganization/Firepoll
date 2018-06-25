var mongoose = require('mongoose');
mongoose.connect('mongodb://laurents:stx7JBM-X@ds217131.mlab.com:17131/live-polling-service');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected');
});

var pollSchema = mongoose.Schema({
  author: String,
  title: String,
  pollId: String,
  status: String,
  executionDate: Date,
  totalAnswers: Number,
  winningAnswer: String,
  questions: [{
    questionId: String,
    question: String,
    type: String,
    answers: [{
      choiceId: String,
      choice: String,
      responders: [String],
      votes: Number
    }]
  }]
});

var Poll = mongoose.model('Poll', repoSchema);


var saveSomething = (Objs) => {
//   Objs.forEach((repoObj) => {
//     var repo = new Repo(repoObj);
//     Repo.update({id: repo.id}, repo, {upsert: true}, function (err) {
//       if(err) return console.error(err);
//     });
//   })
};

var retrieve = (limit, cb) => {
  // Repo.find({}).sort('-stars').limit(limit).exec(function(err, docs) {
  //   if(err) return console.error(err);
  //   console.log('repos: ', docs);
  //   cb(docs);
  // });
}

module.exports.saveRepos = saveRepos;
module.exports.retrieve = retrieve;