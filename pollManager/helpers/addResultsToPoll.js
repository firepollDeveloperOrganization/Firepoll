
var addResultsToPoll = (poll, results) => {

  let totalVotes = 0;
  // Results.val() will be null, if no votes have been recorded
  if(results) {
    results = results.questions;
    poll.questions = poll.questions.map(question => {
      question.answers = question.answers.map(answer => {
        answer.votes = 0;
        try {
          answer.choice = answer.value;
          delete answer.value;
          if(results[question._id].aggregates[answer.id]) {
            let votes = results[question._id].aggregates[answer.id].vote_count;
            totalVotes += votes;
            answer.votes += votes;
          }
        }
        catch (err) {
          console.error(err);
        }
        return answer;
      })
      return question;
    })
  }
  poll.total_answers = totalVotes;
  poll.active = false;
  poll.completed = true;
  return poll;
};

module.exports = addResultsToPoll;
