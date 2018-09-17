'use strict';

const { notify } = require('./app/functions');

(async () => {
  const response = await notify();
  console.log(response);
})();
