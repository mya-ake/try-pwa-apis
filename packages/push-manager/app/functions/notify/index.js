const { initilizeFirebase } = require('../../middleware');

const main = async input => {
  await initilizeFirebase();
  return {
    statusCode: 200,
    body: JSON.stringify({
      input,
    }),
  };
};

module.exports = main;
