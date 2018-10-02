const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./../../firebase-access-key.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = {
  firebaseAdmin,
};
