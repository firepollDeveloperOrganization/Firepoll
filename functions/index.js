const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
admin.initializeApp();

if (!admin.apps.length) {
  admin.initializeApp(config);
}

exports.mapReduceVotesAtScale = functions.https.onRequest((req, res) => {

  axios.get('https://live-poll-ravenclaw.firebaseio.com/polls/5b3bfdf931a385b09e9417c7/questions/5b3bfdf931a385b09e9417c8/votes.json').then((snap) => {
    res.send(snap);
  }).catch((err) => {
    res.send(err);
  });
});


// Simple reduce functionality
exports.mapReduceVotes = functions.https.onRequest((req, res) => {

  admin.database().ref(`/polls/${req.body.poll_id}/questions/${req.body.question_id}/votes`).once('value').then(snap => {
    aggregateDataForProcessing = {};

    snap.forEach((childSnap) => {
      const voteData = childSnap.val();
      if (aggregateDataForProcessing[voteData.answer_id]) {
        aggregateDataForProcessing[voteData.answer_id].vote_count += 1
      } else {
        aggregateDataForProcessing[voteData.answer_id] = {
          answer_id: voteData.answer_id,
          answer_value: voteData.answer_value,
          poll_id: voteData.poll_id,
          question_id: voteData.question_id,
          vote_count : 1
        }
      }
    });

    for (let aggregateKey in aggregateDataForProcessing) {
      var aggregate = aggregateDataForProcessing[aggregateKey]
      admin.database().ref(`/polls/${aggregate.poll_id}/questions/${aggregate.question_id}/aggregates/${aggregate.answer_id}`).set(aggregate).then(() => {res.status(200).send()});
    }

    res.status(200).send("Completed");

  });
});
