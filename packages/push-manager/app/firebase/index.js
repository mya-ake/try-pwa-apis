const { join } = require('path');
const { isInitialized, initialize, FirebaseMessaging } = require('./firebase');
const { loadKey } = require('./load-key');

const initializeFirebase = async () => {
  if (isInitialized()) {
    return;
  }
  const keyPathname = join(__dirname, 'service-account');
  const key = await loadKey(keyPathname);
  initialize(key);
};

module.exports = {
  initializeFirebase,
  FirebaseMessaging,
};
