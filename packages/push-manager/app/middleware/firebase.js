console.log('middleware firebase');
const { initializeFirebase } = require('./../firebase');

const initilizeFirebase = async () => {
  await initializeFirebase();
};

module.exports = {
  initilizeFirebase,
};
