const { initilizeFirebase } = require('./../../middleware');
const Request = require('./../../core/Request');
const { FirebaseMessaging } = require('./../../firebase');

const main = async event => {
  await initilizeFirebase();
  const request = new Request(event);
  const { token = null } = request.params;

  if (token === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Bad Request',
      }),
    };
  }

  const messaging = new FirebaseMessaging();
  const result = await messaging
    .notify({
      title: 'Test notification',
      body: 'test body',
      token,
    })
    .catch(err => console.log('[error]', err) || null);

  console.log('[info:messaging:result]', result);

  if (result.isError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: result.response.message,
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'ok',
    }),
  };
};

module.exports = main;
