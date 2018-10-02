const firebaseMessaging = require('./../services/firebase-messaging');

const notifyValidator = params => {
  console.log(params);
  if ('token' in params === false) {
    return {
      status: 400,
      message: 'Required `token` property',
    };
  }
  return null;
};

const notify = async (req, res) => {
  const params = req.body || {};
  const validateResult = notifyValidator(params);
  if (validateResult !== null) {
    const { status, message } = validateResult;
    res.status(status);
    res.json({ message });
    return;
  }

  const { token } = params;
  const result = await firebaseMessaging.notify({
    title: 'Try PWA',
    body: 'web push notifications test',
    token,
  });
  console.log('[info]', 'token result', result);

  if (result.isError) {
    const { message } = result.response;
    res.status(400);
    res.json({ message });
    return;
  }
  res.json({ message: 'ok' });
};

module.exports = {
  notify,
};
