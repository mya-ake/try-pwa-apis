const { CORS } = require('./../../app.config');

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Headers', CORS.HEADERS);
  res.header('Access-Control-Allow-Methods', CORS.METHODS);
  res.header('Access-Control-Allow-Origin', CORS.ORIGIN);
  next();
};

module.exports = { corsMiddleware };
