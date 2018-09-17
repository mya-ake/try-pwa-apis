'use strict';

const { notify } = require('./app/functions');

module.exports.notify = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const response = await notify(event);
  return response;
};
