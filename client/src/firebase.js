/* Firebase Interface */

const firebase = require('firebase')

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

var getFirestoreData = {}

  // Get all polls
  getFirestoreData.getAllPolls = () => {
    return firebase.firestore().collection('polls').get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        });
      });
        return data;
      });
  }

  // Get specific poll
  getFirestoreData.getPoll = (poll_id) => {
    if (!poll_id) {
      return null;
    }
    return firebase.firestore().collection('polls').doc(poll_id).get().then( (snapshot) => {
        return {id: snapshot.id, data: snapshot.data()};
      });
  }

  // Get all questions from specific poll
  getFirestoreData.getAllQuestionsFromPoll = (poll_id) => {
    return firebase.firestore().collection('questions').where('poll_id', '==', poll_id).get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        });
      });
        return data;
      });
  }

  // Get a specific question
  getFirestoreData.getQuestion = (question_id) => {
    if (!question_id) {
      return null;
    }
    return firebase.firestore().collection('questions').doc(question_id).get().then( (snapshot) => {
        return {id: snapshot.id, data: snapshot.data()};
      });
  }

  // Get all responses from question
  getFirestoreData.getAllResponsesFromQuestion = (question_id) => {
    return firebase.firestore().collection('responses').where('question_id', '==', question_id).get().then( (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data()
        });
      });
        return data;
      });
  }

  // Get a specific response
  getFirestoreData.getResponse = (response_id) => {
    if (!response_id) {
      return null;
    }
    return firebase.firestore().collection('responses').doc(response_id).get().then( (snapshot) => {
        return {id: snapshot.id, data: snapshot.data()};
      });
  }

  // TESTING START
  // getFirestoreData.getAllPolls().then((data) => {
  //   console.log('all polls', data);
  // });

  // getFirestoreData.getPoll('YROTzLFtNPbhxlAGVbAx').then((data) => {
  //   console.log('single poll', data);
  // });

  // getFirestoreData.getAllQuestionsFromPoll('YROTzLFtNPbhxlAGVbAx').then((data) => {
  //   console.log('all qs', data);
  // });

  // getFirestoreData.getQuestion('kBmo5FP8cmxnZXvW2kSX').then((data) => {
  //   console.log('single q', data);
  // });

  // getFirestoreData.getAllResponsesFromQuestion('kBmo5FP8cmxnZXvW2kSX').then((data) => {
  //   console.log('all responses for q', data);
  // });

  // getFirestoreData.getResponse('ZcH3qzP3PtsDEgeUis3d').then((data) => {
  //   console.log('single response', data);
  // });