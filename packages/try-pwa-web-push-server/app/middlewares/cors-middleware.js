const corsMiddleware = (req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Content-Length, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

module.exports = { corsMiddleware };
