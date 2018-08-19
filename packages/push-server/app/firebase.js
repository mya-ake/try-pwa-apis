const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('./../firebase-access-key.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  projectId: 'try-pwa-87c4c',
});

const messaging = firebaseAdmin.messaging();

const token = '';

messaging
  .send({
    data: {
      title: 'FCM Message',
      body: 'This is an FCM Message',
    },
    token,
  })
  .then(response => {
    console.log('success', response);
    process.exit(0);
  })
  .catch(err => {
    console.log('error', err);
    process.exit(1);
  });
