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
  .document('polls/{pollId}/votes/{voteId}')
  .onCreate((snap, context) => {
      console.log(snap.data());
      db.collection('aggregates').doc().set({
        data: snap.data()
      }).then(()=> {
        console.log('new aggregate created');
      }).catch((err) => {
        console.log(err);
        process.exit();
      });

  });


  // .onCreate((snap, context) => {
  //   const createdData = snap.val(); // data that was created
  // });