const { corsMiddleware } = require('./cors-middleware');
const {
  customDefaultHeaderMiddleware,
} = require('./custom-default-header-middleware');

module.exports = {
  corsMiddleware,
  customDefaultHeaderMiddleware,
};
