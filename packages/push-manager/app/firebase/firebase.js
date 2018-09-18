const firebaseAdmin = require('firebase-admin');

const isInitialized = () => {
  return firebaseAdmin.apps.length > 0;
};

const initialize = serviceAccount => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
};

class FirebaseMessaging {
  constructor() {
    this._messaging = firebaseAdmin.messaging();
  }

  notify({ title, body, token }) {
    return this._messaging
      .send({
        data: {
          title,
          body,
        },
        token,
      })
      .then(response => {
        return {
          isError: false,
          response,
        };
      })
      .catch(err => {
        return {
          isError: true,
          response: err.errorInfo,
        };
      });
  }
}

module.exports = {
  isInitialized,
  initialize,
  FirebaseMessaging,
};
