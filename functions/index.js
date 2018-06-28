// const functions = require('firebase-functions');

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
// const config = JSON.parse(process.env.FIREBASE_CONFIG);
// adminConfig.credential = admin.credential.cert(serviceAccount);

// console.log('CLOSING TIME, ONE LAST CALL FOR ALCOHOL');
// console.log(JSON.stringify(config));

// admin.initializeApp(adminConfig);
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

  // Bucket data as it comes in -- limit total computation needed