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

const db = admin.firestore();



exports.aggregateVotes = functions.firestore
  .document('polls/{pollId}/{questionCollectionId}/{questionId}/votes/{voteId}')
  .onCreate((snap, context) => {
      const voteData = snap.data();
      var aggregateRef = db.collection(`polls/${context.params.pollId}/${context.params.questionCollectionId}/${context.params.questionId}/aggregates`).doc(`${voteData.answer_id}`);

      aggregateRef.get().then((snapShot) => {

        console.log(snapShot.exists);

        // We need to find a more clever trigger for these functions to run
        // Run once every second
        // Only start running on poll creation
        // Aggregators should already be there with counts set to 0
        // clound function dispatches other counter cloud functions

        aggregateRef.set(voteData).then(()=> {
          console.log('new aggregate created');
        }).catch((err) => {
          console.log(err);
          process.exit();
        });
  
      });

  });
