const { firebaseAdmin } = require('./firebase');

const messaging = firebaseAdmin.messaging();

const notify = ({ title, body, token }) => {
  return messaging
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
    .catch(error => {
      return {
        isError: true,
        response: error.errorInfo,
      };
    });
};

module.exports = {
  notify,
};
