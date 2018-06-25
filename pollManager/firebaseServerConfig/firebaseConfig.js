var admin = require("firebase-admin");

var serviceAccount = require('../../firebaseAdminSecret.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://live-poll-ravenclaw.firebaseio.com"
});

module.exports = admin;
