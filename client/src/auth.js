/* AUTHENTICATION INTERFACE (HELPERS) FILE */
import {firebase} from './firepollManagementClient';
import * as firebaseui from 'firebaseui';

// // Sign Up
// export const joinWithEmail = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// // Sign in with Email
// export const authWithEmail = (email, password) => auth.signInWithEmailAndPassword(email, password);

// // Sign in with Google
// export const authWithEmail = (email, password) => auth.signInWithEmailAndPassword(email, password);

// // Sign Out
// export const doSignOut = () => auth.signOut();

// =========================

var uiConfig = {
  signInSuccessUrl: '/dashboard',
  signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ], 
  signInFlow: "popup"
  // tosUrl: '<your-tos-url>'
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());

export { ui, uiConfig };