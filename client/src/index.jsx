import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCL6Wv_NdqmEG8f7ukbfvkkXpQgiSHhzK8",
  authDomain: "live-poll-ravenclaw.firebaseapp.com",
  databaseURL: "https://live-poll-ravenclaw.firebaseio.com",
  projectId: "live-poll-ravenclaw",
  storageBucket: "live-poll-ravenclaw.appspot.com",
  messagingSenderId: "363057085922"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
document.getElementById('app'));