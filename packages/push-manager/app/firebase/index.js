const { initialize, FirebaseMessaging } = require('./firebase');
const { loadKey } = require('./load-key');

const initializeFirebase = async () => {
  const key = await loadKey('./service-account');
  initialize(key);
};

module.exports = {
  initializeFirebase,
  FirebaseMessaging,
};
