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
  firepoll.listen.question = (questions, cb) => {
    if (!Array.isArray(questions)) {
      questions = [questions]
    }
    for (let aQuestion of questions) {
      firestore.collection('questions').doc(aQuestion.id).onSnapshot((snapshot) => {
        const snapShotData = snapshot.data();
        snapShotData.id = snapshot.id;
        cb(snapShotData);
      });
    }
  }

  //listen for changes to response
  firepoll.listen.response = (responses, cb) => {
    if (!Array.isArray(responses)) {
      responses = [responses]
    }
    for (let aResponse of responses) {
      firestore.collection('responses').doc(aResponse.id).onSnapshot((snapshot) => {
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
    return firestore.collection('questions').where('poll_id', '==', poll_id).get().then( (snapshot) => {
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
  firepoll.get.question = (question_id) => {
    if (!question_id) {
      return null;
    }
    return firestore.collection('questions').doc(question_id).get().then( (snapshot) => {
        var docData = snapshot.data();
        docData.id = snapshot.id;
        return docData;
      });
  }

  // Get all responses from a poll
  firepoll.get.allResponsesFromPoll = (poll_id) => {
    return firestore.collection('responses').where('poll_id', '==', poll_id).get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
          var docData = doc.data();
          docData.id = doc.id;
          data.push(docData);
      });
        return data;
      });
  }

  // Get all responses from a question
  firepoll.get.allResponsesFromQuestion = (question_id) => {
    return firestore.collection('responses').where('question_id', '==', question_id).get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
          var docData = doc.data();
          docData.id = doc.id;
          data.push(docData);
      });
        return data;
      });
  }

  // Get a specific response
  firepoll.get.response = (response_id) => {
    if (!response_id) {
      return null;
    }
    return firestore.collection('responses').doc(response_id).get().then( (snapshot) => {
        var docData = snapshot.data();
        docData.id = snapshot.id;
        return docData;
      });
  }

  // LISTEN FIRESTOREDATA TESTING START

  //  firepoll.listen.poll('YROTzLFtNPbhxlAGVbAx', (data) => {
  //    console.log(data);
  //  });

  //  firepoll.listen.question('kBmo5FP8cmxnZXvW2kSX', (data) => {
  //   console.log(data);
  // });

  //  firepoll.listen.response('ZcH3qzP3PtsDEgeUis3d', (data) => {
  //   console.log(data);
  // });

  // getFirestoreData --> TESTING START
  // firepoll.get.allPolls().then((data) => {
  //   console.log('all polls', data);
  // });

  // firepoll.get.poll('YROTzLFtNPbhxlAGVbAx').then((data) => {
  //   console.log('single poll', data);
  // });

  // firepoll.get.allQuestionsFromPoll('YROTzLFtNPbhxlAGVbAx').then((data) => {
  //   console.log('all qs', data);
  // });

  // firepoll.get.question('kBmo5FP8cmxnZXvW2kSX').then((data) => {
  //   console.log('single q', data);
  // });

  // firepoll.get.allResponsesFromQuestion('kBmo5FP8cmxnZXvW2kSX').then((data) => {
  //   console.log('all responses for q', data);
  // });

  // firepoll.get.response('ZcH3qzP3PtsDEgeUis3d').then((data) => {
  //   console.log('single response', data);
  // });

  export default firepoll;