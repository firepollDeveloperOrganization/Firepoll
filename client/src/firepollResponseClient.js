import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCL6Wv_NdqmEG8f7ukbfvkkXpQgiSHhzK8",
  authDomain: "live-poll-ravenclaw.firebaseapp.com",
  databaseURL: "https://live-poll-ravenclaw.firebaseio.com",
  projectId: "live-poll-ravenclaw",
  storageBucket: "live-poll-ravenclaw.appspot.com",
  messagingSenderId: "363057085922"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/* Firebase Interface */
const settings = {/* your settings... */ timestampsInSnapshots: true};
const firestore = firebase.firestore();
const realTimeDB = firebase.database();
firestore.settings(settings);

const firepoll = {}

// VOTING FUNCTIONALITY (CLIENT ONLY)

firepoll.vote = {}

  //allow the user to vote
  firepoll.vote.submit = (vote) => {
    return realTimeDB.ref(`/polls/${vote.poll_id}/questions/${vote.question_id}/votes/${vote.user_id}`).set(vote).then(() => {console.log('vote complete')});
  }

// LISTEN TO DATA FROM FIRESTORE INTERFACE
firepoll.listen = {}
  //listen for changes to poll
  firepoll.listen.poll = (polls, cb) => {
    if (!Array.isArray(polls)) {
      polls = [polls]
    }
    for (let aPoll of polls) {
      firestore.collection('polls').doc(aPoll.id).onSnapshot((snapshot) => {
        const snapShotData = snapshot.data();
        snapShotData.id = snapshot.id;
        cb(snapShotData);
      });
    }
  }

  //listen for changes to question
  firepoll.listen.question = (poll_id, questions, cb) => {
    if (!Array.isArray(questions)) {
      questions = [questions]
    }
    for (let aQuestion of questions) {
      firestore.collection(`polls/${poll_id}/questions`).doc(aQuestion.id).onSnapshot((snapshot) => {
        const snapShotData = snapshot.data();
        snapShotData.id = snapshot.id;
        cb(snapShotData);
      });
    }
  }

  //listen for changes to result
  firepoll.listen.results = (poll_id, question_id, cb) => {
    return realTimeDB.ref(`/polls/${poll_id}/questions/${question_id}/aggregates`)
    .on('value', (snapshot) => {
      let results = snapshot.val();
      if (!Array.isArray(results) && results !== null) {
        var key = Object.keys(results)[0];
        results = results[key];
      }
      cb(results);
    });
  }

  // firepoll.get.results = (poll_id, question_id) => {
  //   return realTimeDB.ref(`/polls/${poll_id}/questions/${question_id}/aggregates`).once('value').then((snap) => {
  //     let results = snap.val();
  //     if (!Array.isArray(snap.val())) {
  //       results = [results];
  //     }
  //     return results;
  //   });
  // }

// GET DATA FROM FIRESTORE INTERFACE
firepoll.get = {}
  // Get all polls
  firepoll.get.allPolls = () => {
    return firestore.collection('polls').get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
          var docData = doc.data();
          docData.id = doc.id;
          data.push(docData);
      });
        return data;
      });
  }

  // Get specific poll
  firepoll.get.poll = (poll_id) => {
    if (!poll_id) {
      return null;
    }
    return firestore.collection('polls').doc(poll_id).get().then( (snapshot) => {
        var docData = snapshot.data();
        docData.id = snapshot.id;
        return docData;
      });
  }

  // Get all questions from specific poll
  firepoll.get.allQuestionsFromPoll = (poll_id) => {
    return firestore.collection(`polls/${poll_id}/questions`).get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
          var docData = doc.data();
          docData.id = doc.id;
          data.push(docData);
      });
        return data;
      });
  }

  // Get a specific question
  firepoll.get.question = (poll_id, question_id) => {
    if (!question_id) {
      return null;
    }
    return firestore.collection(`polls/${poll_id}/questions`).doc(question_id).get().then( (snapshot) => {
        var docData = snapshot.data();
        docData.id = snapshot.id;
        return docData;
      });
  }

  // GET LIVE RESULTS
  firepoll.get.results = (poll_id, question_id) => {
    return realTimeDB.ref(`/polls/${poll_id}/questions/${question_id}/aggregates`).once('value').then((snap) => {
      let results = snap.val();
      if (!Array.isArray(results) && results !== null) {
        var key = Object.keys(results)[0];
        results = results[key];
      }
      return results;
    });
  }

  export default firepoll;