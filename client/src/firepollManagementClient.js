var firebase = require("firebase/app");
require("firebase/database");
require("firebase/firestore");
require("firebase/auth");

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

firepoll.user = {};

  firepoll.user.get = (pollId, cb) => {
    return new Promise((resolve, reject) => {
      realTimeDB.ref(`/users/${pollId}/`).on('value', (data) => {
        resolve(data.val())
      }); 
    });
  }

  // STAGE POLL
  firepoll.stage = (pollId, cb) => {
    firestore.collection('stagedPolls').doc(pollId).set({
      active: false,
      completed: false
    })
    .then(() => {
      console.log("Poll successfully staged");
      cb();
    })
    .catch(err => {
      console.error("Staging poll to firestore: ", err);
    })
  }

  firepoll.unstage = pollId => firestore.collection('stagedPolls').doc(pollId).delete();

  // RUN POLL 
  firepoll.run = ({poll, questions}) => {
    // Send poll data into the right collections/subcollections
    firestore.collection("polls").doc(poll._id).set(poll.data)
    .then(() => {
      let batch = firestore.batch();
      questions.forEach((question, i) => {
        if (i === 0) {
          question.data.active = true;
        } else {
          question.data.active = false;
        }
        let docRef = firestore.collection("polls").doc(poll._id).collection("questions").doc(question.id);
        batch.set(docRef, question.data);
      })
      batch.commit().then(() => {
        // update stagedPolls collection for poll to active
        firestore.collection("stagedPolls").doc(poll._id).update({active: true})
        .then(() => {
          console.log("Poll is deployed!");
        })
        .catch(err => {
          console.error("updating staged polls: ", err);
        })
      })
      .catch(err => {
        console.error("adding questions as subcollections of poll: ", err);
      })
    })
    .catch(err => {
      console.error("adding poll to polls collection: ", err);
    })
  };

  // CLOSE POLL
  firepoll.close = (poll) => {
    let batch = firestore.batch();
    poll.questions.forEach(question => {
      let docRef = firestore.collection("polls").doc(poll._id).collection("questions").doc(question._id);
      batch.delete(docRef);
    })
    batch.commit().then(() => {

      firestore.collection("polls").doc(poll._id).delete()
      .catch(err => {
        console.error('removing poll from firestore: ', err)
      })
      firestore.collection('stagedPolls').doc(poll._id).set({
        active: false,
        completed: true
      })
      .catch(err => {
        console.error('updating complete status in stagedPolls: ', err)
      })
    .catch(err => {
      console.error('removing subcollections from firestore: ', err)
    })})
  }  

  // UPDATE A QUESTION IN LIVE POLL (e.g. for toggling active status)
  firepoll.updateQuestion = (pollId, questionId, update) => {
    firestore.collection('polls').doc(pollId).collection('questions').doc(questionId).update(update)
    .then(() => {
      console.log('updated question ', questionId);
    })
    .catch(err => {console.error('error updating question in firepoll', err)})
  };

// LISTEN TO DATA FROM FIRESTORE INTERFACE
firepoll.listen = {}
  //listen for changes to poll
  firepoll.listen.poll = (polls, cb) => {
    if (!Array.isArray(polls)) {
      polls = [polls]
    }
    for (let aPoll of polls) {
      firestore.collection('polls').doc(aPoll._id).onSnapshot((snapshot) => {
        if(snapshot.data()) {
          const snapShotData = snapshot.data();
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
      console.log('aQuestion: ', aQuestion);
      firestore.collection(`polls/${poll_id}/questions`).doc(aQuestion._id).onSnapshot((snapshot) => {
        const snapShotData = snapshot.data();
        snapShotData._id = snapshot.id;
        cb(snapShotData);
      });
    }
  }

  firepoll.listen.results = (poll_id, question_id, cb) => {
    return realTimeDB.ref(`/polls/${poll_id}/questions/${question_id}/aggregates`)
    .on('value', (snapshot) => {
      let results = snapshot.val();
      let data = [];
      for (let result in results) {
        data.push(results[result]);
      }
      cb(data, question_id);
    });
  }

// GET DATA FROM FIRESTORE INTERFACE
firepoll.get = {}
  // Get all polls
  firepoll.get.allPolls = () => {
    return firestore.collection('polls').get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
          var docData = doc.data();
          docData._id = doc.id;
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
        docData._id = snapshot.id;
        return docData;
      });
  }

  // Get all questions from specific poll
  firepoll.get.allQuestionsFromPoll = (poll_id) => {
    return firestore.collection(`polls/${poll_id}/questions`).get().then( (snapshot) => {
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
    return firestore.collection(`polls/${poll_id}/questions`).doc(question_id).get().then( (snapshot) => {
        var docData = snapshot.data();
        docData._id = snapshot.id;
        return docData;
      });
  }

  module.exports = { firebase, firepoll, realTimeDB };