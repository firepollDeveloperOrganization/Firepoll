const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

if (!admin.apps.length) {
  admin.initializeApp(config);
}

exports.aggregateVotes = functions.database
  .ref(`/polls/{poll_id}/questions/{question_id}/votes`)
  .onWrite((change, context) => {
      const dataToExtract = change.after.val();
      const dataForAggregation = Object.keys(dataToExtract).map(key => dataToExtract[key])[0];
      dataForAggregation.timeStamp = Date.now();
      // realTimeDB.ref(`/polls/${vote.poll_id}/questions/${vote.question_id}/votes/${vote.user_id}`).set(vote).then(() => {console.log('vote complete')})
      return admin.database().ref(`/polls/${context.params.poll_id}/questions/${context.params.question_id}/aggregates`).child(`${dataForAggregation.answer_id}`).transaction((aggregate) => {
        if (!aggregate) {
          dataForAggregation.vote_count = 1;
          return dataForAggregation;
        } else {
          aggregate.vote_count = parseInt(aggregate.vote_count) + 1;
          return aggregate;
        }
      })
  });

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