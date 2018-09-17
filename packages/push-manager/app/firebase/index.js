const { join } = require('path');
const { initialize, FirebaseMessaging } = require('./firebase');
const { loadKey } = require('./load-key');

const initializeFirebase = async () => {
  const keyPathname = join(__dirname, 'service-account');
  console.log(keyPathname);
  const key = await loadKey(keyPathname);
  initialize(key);
};

module.exports = {
  initializeFirebase,
  FirebaseMessaging,
};
