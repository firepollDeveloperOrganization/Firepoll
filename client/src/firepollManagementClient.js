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
firestore.settings(settings);

const firepoll = {}

// STAGE POLL
  // allow the user to stage a poll
  firepoll.stage = (pollId, cb) => {
    firestore.collection('stagedPolls').doc(pollId).set({
      active: false,
    })
    .then(() => {
      console.log("Poll successfully staged");
      cb();
    })
    .catch(err => {
      console.error("Staging poll to firestore: ", err);
    })
  }

  // RUN POLL 
  firepoll.run = ({poll, questions}) => {
    // Send poll data into the right collections/subcollections
    firestore.collection("polls").doc(poll.id).set(poll.data)
    .then(() => {
      let batch = firestore.batch();
      questions.forEach(question => {
        let docRef = firestore.collection("polls").doc(poll.id).collection("questions").doc(question.id);
        batch.set(docRef, question.data);
      })
      batch.commit().then(() => {
        // update stagedPolls collection for poll to active
        firestore.collection("polls").doc(poll.id).update({active: true})
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

  export default firepoll;
