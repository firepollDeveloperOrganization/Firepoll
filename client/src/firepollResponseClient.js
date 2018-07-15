import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

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
const firestoreDB = firebase.firestore();
const realTimeDB = firebase.database();
firestoreDB.settings(settings);

const firepoll = {}

// USER PRESENCE FUNCTION (CLIENT ONLY)

firepoll.user = {}

  firepoll.user.signin = (userId, pollId) => {
    realTimeDB.ref(`/users/${pollId}/${userId}`).onDisconnect().remove();
    return realTimeDB.ref(`/users/${pollId}/${userId}`).set(true);
  }

// VOTING FUNCTIONALITY (CLIENT ONLY)

firepoll.vote = {}

  //allow the user to vote
  firepoll.vote.submit = (vote) => {
    return realTimeDB.ref(`/polls/${vote.poll_id}/questions/${vote.question_id}/votes`).push(vote).then(() => {console.log('vote complete')});
  }

// LISTEN TO DATA FROM firestoreDB INTERFACE
firepoll.listen = {}
  //listen for changes to poll status
  firepoll.listen.pollStatus = (polls, cb) => {
    if (!Array.isArray(polls)) {
      polls = [polls]
    }
    for (let aPoll of polls) {
      firestoreDB.collection('stagedPolls').doc(aPoll).onSnapshot((snapshot) => {
        const snapShotData = snapshot.data();
        if(snapShotData) {
          snapShotData._id = snapshot.id;
          cb(snapShotData);
        }
      });
    }
  }

  //listen for changes to poll
  firepoll.listen.poll = (polls, cb) => {
    if (!Array.isArray(polls)) {
      polls = [polls]
    }
    for (let aPoll of polls) {
      firestoreDB.collection('polls').doc(aPoll._id).onSnapshot((snapshot) => {
        const snapShotData = snapshot.data();
        if(snapShotData) {
          snapShotData._id = snapshot.id;
          cb(snapShotData);
        }
      });
    }
  }

  //listen for changes to question
  firepoll.listen.question = (poll_id, questions, cb) => {
    if (!Array.isArray(questions)) {
      questions = [questions]
    }
    for (let aQuestion of questions) {
      firestoreDB.collection(`polls/${poll_id}/questions`).doc(aQuestion._id).onSnapshot((snapshot) => {
        try {
          const snapShotData = snapshot.data();
          snapShotData._id = snapshot.id;
          cb(snapShotData);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  //listen for changes to result
  firepoll.listen.results = (poll_id, question_id, cb) => {
    return realTimeDB.ref(`/polls/${poll_id}/questions/${question_id}/aggregates`)
    .on('value', (snapshot) => {
      let results = snapshot.val();
      let data = [];
      for (let result in results) {
        data.push(results[result]);
      }
      cb(data);
    });
  }

// GET DATA FROM firestoreDB INTERFACE
firepoll.get = {}
  // Get all polls
  firepoll.get.allPolls = () => {
    return firestoreDB.collection('polls').get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
          try {
            var docData = doc.data();
            docData._id = doc.id;
            data.push(docData);
          } catch(error) {
            console.log(error);
          }
      });
        return data;
      });
  }

  // Get specific poll
  firepoll.get.poll = (poll_id) => {
    if (!poll_id) {
      return null;
    }
    return firestoreDB.collection('polls').doc(poll_id).get().then( (snapshot) => {
      if(snapshot.data()) {
        var docData = snapshot.data();
        docData._id = snapshot.id;
        return docData;
      }
    });
  };

  // Get poll status
  firepoll.get.pollStatus = (poll_id) => {
    if (!poll_id) {
      return null;
    }
    return firestoreDB.collection('stagedPolls').doc(poll_id).get().then((snapshot) => {
      return snapshot.data();
    });
  };

  // Get all questions from specific poll
  firepoll.get.allQuestionsFromPoll = (poll_id) => {
    return firestoreDB.collection(`polls/${poll_id}/questions`).get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
          var docData = doc.data();
          docData._id = doc.id;
          data.unshift(docData);
      });
        return data;
      });
  }

  // Get a specific question
  firepoll.get.question = (poll_id, question_id) => {
    if (!question_id) {
      return null;
    }
    return firestoreDB.collection(`polls/${poll_id}/questions`).doc(question_id).get().then( (snapshot) => {
        var docData = snapshot.data();
        docData._id = snapshot.id;
        return docData;
      });
  }

  // GET LIVE RESULTS
  firepoll.get.results = (poll_id, question_id) => {
    return realTimeDB.ref(`/polls/${poll_id}/questions/${question_id}/aggregates`).once('value').then((snap) => {
      let results = snap.val();
      let data = [];
      for (let result in results) {
        data.push(results[result]);
      }
      return data;
    });
  }

  export default firepoll;