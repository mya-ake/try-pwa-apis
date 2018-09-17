'use strict';

const { notify } = require('./app/functions');
const logger = require('./utils/logger');

module.exports.notify = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  logger.name('event').info(event);
  const response = await notify(event);
  return response;
};
