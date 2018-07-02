
var addResultsToPoll = (poll, results) => {
  let totalVotes = 0;
  poll.questions = poll.questions.map(question => {
    // let questionId = question.id
    question.answers = question.answers.map(answer => {
      console.log('addResultsToPoll running... ');      
      try {
      console.log('try is running ...');
      let votes = results[question._id].aggregates[answer._id].vote_count;
      totalVotes += votes;
      answer.votes = votes;
      console.log('votes: ', votes);
      }
      catch (err) {
        console.log('catch is running...')
        console.error(err);
      }
      return answer;
    })
    return question;
  })
  poll.total_answers = totalVotes;
  poll.active = false;
  poll.completed = true;
  console.log('Poll before returning from helper: ', poll)
  return poll;
};

module.exports = addResultsToPoll;
/*
{
  "5b37a229fbfdcc000b841865": {
      "aggregates": {
          "5b37a229fbfdcc000b841866": {
              "answer_id": "5b37a229fbfdcc000b841866",
              "answer_value": "Argentina",
              "poll_id": "5b37a229fbfdcc000b841864",
              "question_id": "5b37a229fbfdcc000b841865",
              "timeStamp": 1530374732181,
              "user_id": "WlcKCnuuFoanba9C9cF92yBYA502",
              "vote_count": 1
          },
          "5b37a229fbfdcc000b841866": {
            "answer_id": "5b37a229fbfdcc000b841866",
            "answer_value": "Argentina",
            "poll_id": "5b37a229fbfdcc000b841864",
            "question_id": "5b37a229fbfdcc000b841865",
            "timeStamp": 1530374732181,
            "user_id": "WlcKCnuuFoanba9C9cF92yBYA502",
            "vote_count": 1
        }
      },
      "votes": {
          "WlcKCnuuFoanba9C9cF92yBYA502": {
              "answer_id": "5b37a229fbfdcc000b841866",
              "answer_value": "Argentina",
              "poll_id": "5b37a229fbfdcc000b841864",
              "question_id": "5b37a229fbfdcc000b841865",
              "user_id": "WlcKCnuuFoanba9C9cF92yBYA502"
          }
      }
  }



{
  "_id": {
      "$oid": "5b36955a23105a000bfcd77e"
  },
  "author": "WlcKCnuuFoanba9C9cF92yBYA502",
  "title": "World Cup",
  "active": true,
  "completed": false,
  "num_questions": 1,
  "total_answers": 0,
  "winning_response": null,
  "start_time": null,
  "questions": [
      {
          "question": "Who will win the world cup?",
          "question_type": "multiple-choice",
          "total_voting_time": 10000,
          "_id": {
              "$oid": "5b36955a23105a000bfcd77f"
          },
          "answers": [
              {
                  "choice": "Argentina",
                  "votes": 0,
                  "_id": {
                      "$oid": "5b36955a23105a000bfcd784"
                  },
                  "responders": []
              },
              {
                  "choice": "Brazil",
                  "votes": 0,
                  "_id": {
                      "$oid": "5b36955a23105a000bfcd783"
                  },
                  "responders": []
              },
              {
                  "choice": "Frnce",
                  "votes": 0,
                  "_id": {
                      "$oid": "5b36955a23105a000bfcd782"
                  },
                  "responders": []
              },
              {
                  "choice": "Spin",
                  "votes": 0,
                  "_id": {
                      "$oid": "5b36955a23105a000bfcd781"
                  },
                  "responders": []
              },
              {
                  "choice": "Other",
                  "votes": 0,
                  "_id": {
                      "$oid": "5b36955a23105a000bfcd780"
                  },
                  "responders": []
              }
          ]
      }
  ],
  "__v": 0
} */