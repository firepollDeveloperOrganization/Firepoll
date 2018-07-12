var admin = require('firebase-admin');
var serviceAccount = require('../../firebaseAdminSecret.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

//attempting deploy changes below:

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);

module.exports = admin;