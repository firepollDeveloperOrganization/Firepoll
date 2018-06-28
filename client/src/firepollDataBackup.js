// import admin from 'firebase-admin';
// import {firestoreExport} from 'node-firestore-import-export';

admin = require('firebase-admin');
nodeFirestoreImportExport = require('node-firestore-import-export');

var serviceAccount = require('../../firebaseAdminSecret.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://live-poll-ravenclaw.firebaseio.com'
});

if (!admin.apps.length) {
  admin.initializeApp(config);
}

const db = admin.firestore();

const pollsRef = db.collection('polls');
let questionsRef = db.collection('polls/YROTzLFtNPbhxlAGVbAx/questions');
let votesRef = db.collection('polls/YROTzLFtNPbhxlAGVbAx/questions/ryUlGcgRO66eJLfJLsHt/votes');
let aggregatesRef = db.collection('polls/YROTzLFtNPbhxlAGVbAx/questions/ryUlGcgRO66eJLfJLsHt/aggregates');

nodeFirestoreImportExport.firestoreExport(pollsRef).then((data) => {
  console.log(`polls \n`, data);
})

nodeFirestoreImportExport.firestoreExport(questionsRef).then((data) => {
  console.log(`questions \n`, data);
});

nodeFirestoreImportExport.firestoreExport(votesRef).then((data) => {
  console.log(`votes \n`, data);
});

nodeFirestoreImportExport.firestoreExport(aggregatesRef).then((data) => {
  console.log(`aggregates \n`, data);
});


