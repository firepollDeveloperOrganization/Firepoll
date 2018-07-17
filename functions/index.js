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

  // Run cloud function to shallow query db and store Nth indices
  // Run cloud function(s) to reduce all votes
  // Store aggregates

  //'https://fb-queries.firebaseio.com/85d822f6-8b4d-4e4b-b459-9e612392ebe7.json?auth=CREDENTIAL'

  // admin.database().ref(`/polls/${req.body.poll_id}/questions/${req.body.question_id}/votes`).orderByChild('answer_id').startAt(100).limitToFirst(5).once('value').then(snap => {
  //   aggregateDataForProcessing = {};

  //   snap.forEach((childSnap) => {
  //     const voteData = childSnap.val();
  //     if (aggregateDataForProcessing[voteData.answer_id]) {
  //       aggregateDataForProcessing[voteData.answer_id].vote_count += 1
  //     } else {
  //       aggregateDataForProcessing[voteData.answer_id] = {
  //         answer_id: voteData.answer_id,
  //         answer_value: voteData.answer_value,
  //         poll_id: voteData.poll_id,
  //         question_id: voteData.question_id,
  //         vote_count : 1
  //       }
  //     }
  //   });
  //   // res.status(200).send(aggregateDataForProcessing);
  // });
});


// Simple reduce functionality
exports.mapReduceVotes = functions.https.onRequest((req, res) => {
  // map votes is now working! 

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

// Deprecated solution
// exports.aggregateVotes = functions.database
//   .ref(`/polls/{poll_id}/questions/{question_id}/votes`)
//   .onWrite((change, context) => {
//       const dataToExtract = change.after.val();
//       const dataForAggregation = Object.keys(dataToExtract).map(key => dataToExtract[key])[0];
//       dataForAggregation.timeStamp = Date.now();
//       // realTimeDB.ref(`/polls/${vote.poll_id}/questions/${vote.question_id}/votes/${vote.user_id}`).set(vote).then(() => {console.log('vote complete')})
//       return admin.database().ref(`/polls/${context.params.poll_id}/questions/${context.params.question_id}/aggregates`).child(`${dataForAggregation.answer_id}`).transaction((aggregate) => {
//         if (!aggregate) {
//           dataForAggregation.vote_count = 1;
//           return dataForAggregation;
//         } else {
//           aggregate.vote_count = parseInt(aggregate.vote_count) + 1;
//           return aggregate;
//         }
//       })
//   });
