const { initilizeFirebase } = require('./../../middleware');
const Request = require('./../../core/Request');
const { FirebaseMessaging } = require('./../../firebase');
const logger = require('./../../../utils/logger');

const main = async event => {
  await initilizeFirebase();
  const request = new Request(event);
  const { token = null } = request.params;

  if (token === null) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache, max-age=0',
      },
      body: JSON.stringify({
        message: 'Bad Request',
      }),
    };
  }

  const messaging = new FirebaseMessaging();
  const result = await messaging.notify({
    title: 'Test notification',
    body: 'test body',
    token,
  });

  logger.name('messaging:result').info(result);

  if (result.isError) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache, max-age=0',
      },
      body: JSON.stringify({
        message: result.response.message,
      }),
    };
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, max-age=0',
    },
    body: JSON.stringify({
      message: 'ok',
    }),
  };
};

module.exports = main;
