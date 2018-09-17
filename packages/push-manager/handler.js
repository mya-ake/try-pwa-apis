'use strict';

console.log('before import');
const { notify } = require('./app/functions');
console.log('after import', notify);

module.exports.notify = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const response = await notify(event);
  return response;
};
