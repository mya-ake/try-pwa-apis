console.log('firebase firebase');
const firebaseAdmin = require('firebase-admin');

const initialize = serviceAccount => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
};

class FirebaseMessaging {
  constructor() {
    this._messaging = firebaseAdmin.messaging();
  }

  notify({ title, body, token }) {
    return this._messaging.send({
      data: {
        title,
        body,
      },
      token,
    });
  }
}

module.exports = {
  initialize,
  FirebaseMessaging,
};
